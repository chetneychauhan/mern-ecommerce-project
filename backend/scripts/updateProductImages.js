import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/productModel.js';

dotenv.config();

const imageUpdates = [
  { name: 'Wireless Bluetooth Headphones', image: '/uploads/wireless-headphones.png' },
  { name: 'Bluetooth Speaker', image: '/uploads/bluetooth-speaker.png' },
  { name: 'Smart Watch', image: '/uploads/smart-watch.png' },
  { name: 'Running Shoes', image: '/uploads/running-shoes.png' },
  { name: 'Casual Sneakers', image: '/uploads/casual-sneakers.png' },
  { name: 'Backpack', image: '/uploads/backpack.png' },
  { name: 'Face Wash', image: '/uploads/face-wash.png' },
  { name: 'T-Shirt', image: '/uploads/t-shirt.png' },
];

const updateImages = async () => {
  try {
    await connectDB();

    for (const item of imageUpdates) {
      const result = await Product.updateOne(
        { name: item.name },
        { $set: { image: item.image } }
      );

      if (result.matchedCount === 0) {
        console.log(`NOT FOUND: ${item.name}`);
      } else {
        console.log(`UPDATED: ${item.name}`);
      }
    }

    console.log('\nProduct image update completed.');
    process.exit(0);
  } catch (error) {
    console.error('Image update failed:', error);
    process.exit(1);
  }
};

updateImages();
