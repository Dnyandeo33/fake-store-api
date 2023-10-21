import Product from '../models/store.js';

const storeController = {
    getProducts: (req, res) => {
        const products = Product.getProducts();
        res.status(200).render('product', {
            title: 'Products',
            products: products,
            isLoggedIn: req.session.isLoggedIn
        });
    },

    addProductForm: (req, res) => {
        res.status(200).render('productForm', {
            action: '/add-product',
            title: 'Add product',
            btnText: 'Add Product',
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email
        });
    },

    addProduct: (req, res) => {
        const { name, price, description, category, img } = req.body

        if (!name || !price || !description || !category || !img) {
            res.status(400).render('message', {
                title: 'something missing',
                message: `Please fill in all the fields`,
                redirect: '/product',
                linkText: 'Add Product',
                isLoggedIn: req.session.isLoggedIn,
            });
        } else {
            const newProduct = new Product(name, price, description, category, img)
            newProduct.postProduct();
            res.status(302).redirect('/');
        }
    }
};

export default storeController;
