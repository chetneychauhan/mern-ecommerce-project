import Product from '../models/productModel.js';


export const chatWithAI = async (req, res) => {
  try {
    const message = req.body?.message;

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        message: 'Please enter a question.',
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        message: 'Please keep your question under 1000 characters.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    console.log('Gemini model:', model);

    if (!apiKey) {
      return res.status(503).json({
        message: 'The AI assistant is not configured yet.',
      });
    }

    const products = await Product.find({})
      .select('name brand category description price countInStock')
      .limit(50)
      .lean();

    const catalog = products.map((product) => ({
      id: String(product._id),
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.price,
      inStock: product.countInStock > 0,
    }));

    const prompt = `
You are ShopNova's friendly AI shopping assistant.
Help customers discover and compare products using the supplied catalog.
Only state prices, product details, and availability supported by this catalog.
Never invent products, prices, discounts, or stock information.
If no product matches, say so honestly.
Prices are in Indian rupees (INR).
Do not claim to place orders, process payments, or access customer accounts.
Keep answers helpful, concise, and easy to read.

SHOPNOVA PRODUCT CATALOG:
${JSON.stringify(catalog)}

CUSTOMER QUESTION:
${message.trim()}
`;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/interactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          model: model,
          input: prompt,
          store: false,
        }),
        signal: AbortSignal.timeout(60000),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        'Gemini API returned status:',
        response.status,
        data.error?.message || 'Unknown provider error'
      );

      return res.status(502).json({
        message:
          'The AI service is temporarily unavailable. Please try again.',
      });
    }

    const reply = data.steps
      ?.filter((step) => step.type === 'model_output')
      .flatMap((step) => step.content || [])
      .filter((content) => content.type === 'text')
      .map((content) => content.text || '')
      .join('')
      .trim();

    if (!reply) {
      console.error('Gemini returned no text output.');

      return res.status(502).json({
        message: 'The AI could not generate a reply. Please try again.',
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error('AI chat error:', error.message);

    return res.status(500).json({
      message: 'Unable to process your question right now.',
    });
  }
};
