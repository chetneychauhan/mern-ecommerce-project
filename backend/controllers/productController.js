
import Product from '../models/productModel.js';

// Helper: Escape special regex characters
const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc  ---> Fetch all products with search, filters and sorting
// @route ---> GET /api/products
// @access Public
const getProducts = async (req, res) => {
  const {
    keyword,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
  } = req.query;

  const filters = {};

  // Search by product name or brand
  if (keyword?.trim()) {
    const searchRegex = new RegExp(escapeRegex(keyword.trim()), 'i');

    filters.$or = [
      { name: searchRegex },
      { brand: searchRegex },
    ];
  }

  // Filter by category
  if (category?.trim()) {
    filters.category = {
      $regex: escapeRegex(category.trim()),
      $options: 'i',
    };
  }

  // Filter by one or multiple brands
  if (brand) {
    const brands = brand
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (brands.length > 0) {
      filters.brand = {
        $in: brands.map(
          (item) => new RegExp(`^${escapeRegex(item)}$`, 'i')
        ),
      };
    }
  }

  // Filter by minimum and maximum price
  const priceFilter = {};

  if (minPrice !== undefined && minPrice !== '') {
    const min = Number(minPrice);

    if (Number.isFinite(min) && min >= 0) {
      priceFilter.$gte = min;
    }
  }

  if (maxPrice !== undefined && maxPrice !== '') {
    const max = Number(maxPrice);

    if (Number.isFinite(max) && max >= 0) {
      priceFilter.$lte = max;
    }
  }

  if (Object.keys(priceFilter).length > 0) {
    filters.price = priceFilter;
  }

  // Sorting options
  const sortOptions = {
    'price-asc': { price: 1 },
    'price-desc': { price: -1 },
    newest: { createdAt: -1 },
    name: { name: 1 },
  };

  const sortOption = sortOptions[sort] || { createdAt: -1 };

  const products = await Product.find(filters).sort(sortOption);

  res.json(products);
};

// @desc ---> Fetch single product
// @route ---> GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc ---> Get top rated products
// @route ---> GET /api/products/top
// @access Public
const getTopProducts = async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(10);

  res.json(products);
};

// @desc ---> Create new review
// @route ---> POST /api/products/:id/reviews
// @access Private
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({ message: 'Product already reviewed' });
      return;
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// --- ADMIN FUNCTIONS ---

// @desc ---> Create a product
// @route ---> POST /api/products
// @access Private/Admin
const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc ---> Update a product
// @route ---> PUT /api/products/:id
// @access Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc ---> Delete a product
// @route ---> DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export {
  getProducts,
  getProductById,
  createProductReview,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
};