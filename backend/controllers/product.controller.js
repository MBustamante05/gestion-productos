import { Product } from '../models/product.model.js';

export const addProduct = async (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  try {
    const userId = req.user._id;
    const product = new Product({
      name,
      price,
      description,
      category,
      countInStock: quantity,
      userId: userId,
    });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', user: userId });
  } catch (error) {
    console.error('Error adding product: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const getProducts = async (req, res) => {
  const userId = req.user._id;
  try {
    const products = await Product.find({userId});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const allowedFields = [
      'name',
      'price',
      'description',
      'category',
      'countInStock'
    ];
    const product = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        product[field] = req.body[field];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId, {$set: product}, {new: true});

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.json({ message: 'Product deleted successfully' });
  }catch (error) {
    console.error('Error deleting product: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}