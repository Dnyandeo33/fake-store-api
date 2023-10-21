import express from 'express';
import storeController from '../controllers/store.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const { getProducts, addProductForm, addProduct } = storeController;

const router = express.Router();

router.get('/', getProducts)
router.get('/add-product-form', isLoggedIn, addProductForm)
router.post('/add-product', addProduct)


export default router;
