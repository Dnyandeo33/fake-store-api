import express from 'express';
import storeController from '../controllers/store.js';
import verifyToken from '../middleware/verifyToken.js';


const { getProducts, addProductForm, addProduct } = storeController;

const router = express.Router();

router.get('/', getProducts)
router.get('/add-product-form', verifyToken, addProductForm)
router.post('/add-product', verifyToken, addProduct)


export default router;
