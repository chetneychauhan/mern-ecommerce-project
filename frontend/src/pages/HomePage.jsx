
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import Product from '../components/Product';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import FeaturedCategories from '../components/FeaturedCategories';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { keyword, category } = useParams();

  // Filter state
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all products once to build available brand options
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await API.get('/api/products');
        setAllProducts(data);
      } catch (error) {
        console.error('Failed to load filter options:', error);
      }
    };

    fetchAllProducts();
  }, []);

  // Fetch filtered products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const params = {
          keyword,
          category,
          brand: selectedBrands.join(','),
          minPrice,
          maxPrice,
          sort,
        };

        const { data } = await API.get('/api/products', { params });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Unable to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category, selectedBrands, minPrice, maxPrice, sort]);

  const brands = [
    ...new Set(
      allProducts
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));

  const toggleBrand = (brand) => {
    setSelectedBrands((previous) =>
      previous.includes(brand)
        ? previous.filter((item) => item !== brand)
        : [...previous, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    minPrice !== '' ||
    maxPrice !== '' ||
    sort !== 'newest';

  return (
    <>
      {!keyword && !category ? (
        <>
          <ProductCarousel />
          <FeaturedCategories />
        </>
      ) : (
        <Link
          to="/"
          className="inline-block mb-4 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
        >
          Go Back
        </Link>
      )}

      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {keyword
            ? `Search Results for "${keyword}"`
            : category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : 'Latest Products'}
        </h1>

        {/* Filter toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label
              htmlFor="sort"
              className="font-medium text-gray-700 whitespace-nowrap"
            >
              Sort by:
            </label>

            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg p-2 w-full sm:w-52 bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Filters sidebar */}
          {showFilters && (
            <aside className="bg-white border rounded-xl p-5 shadow-sm h-fit">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">Filters</h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Brand filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Brand</h3>

                {brands.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No brands available
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="accent-indigo-600"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price filter */}
              <div>
                <h3 className="font-semibold mb-3">Price Range (₹)</h3>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="block text-sm text-gray-600 mb-1"
                    >
                      Minimum Price
                    </label>
                    <input
                      id="minPrice"
                      type="number"
                      min="0"
                      placeholder="Enter minimum"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="block text-sm text-gray-600 mb-1"
                    >
                      Maximum Price
                    </label>
                    <input
                      id="maxPrice"
                      type="number"
                      min="0"
                      placeholder="Enter maximum"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Done
              </button>
            </aside>
          )}

          {/* Product results */}
          <section
            className={`${
              showFilters ? 'lg:col-span-3' : 'lg:col-span-4'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                {loading ? 'Loading products...' : `${products.length} products found`}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {loading ? (
              <Loader />
            ) : error ? (
              <p className="text-center text-red-600 py-10">{error}</p>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl border p-10 text-center">
                <h2 className="text-xl font-semibold mb-2">
                  No products found
                </h2>
                <p className="text-gray-500 mb-4">
                  Try changing your search or filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;