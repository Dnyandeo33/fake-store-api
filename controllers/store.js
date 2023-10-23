import Corse from '../models/store.js';

const storeController = {
    getProducts: (req, res) => {
        const products = Corse.getProducts();
        res.status(200).render('product', {
            title: 'Products',
            products: products,
            token: req.cookies.token
        });
    },

    addProductForm: (req, res) => {
        res.status(200).render('productForm', {
            action: '/add-product',
            title: 'Add product',
            btnText: 'Add Product',
            token: req.cookies.token
        });
    },

    addProduct: (req, res) => {
        const { name, price, description, img } = req.body

        if (!name || !price || !description || !img) {

            res.status(400).render('message', {
                title: 'something missing',
                message: `Please fill in all the fields`,
                redirect: '/product',
                linkText: 'Add Product',
                token: req.cookies.token
            });
        } else {
            const newCors = new Corse(name, price, description, img)
            newCors.postProduct();
            res.status(302).redirect('/');
        }
    }
};

export default storeController;
