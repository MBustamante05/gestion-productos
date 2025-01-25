import express from 'express';
const router = express.Router();
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

// Si funciona, no se toca
router.get('/', protectedRoute, getProducts);
router.post('/add', protectedRoute, addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;