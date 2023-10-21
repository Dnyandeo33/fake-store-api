import { v4 as productId } from 'uuid';

const products = [
    {
        id: '1',
        name: 'Macbook Air',
        price: '1000',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        category: "Laptop",
        img: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_79349935/fee_786_587_png'
    },
    {
        id: '2',
        name: 'Macbook Pro',
        price: '1200',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        category: "Laptop",
        img: 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP858/mbp16-gray.png'
    }
];

class Product {
    constructor(name, price, description, category, img) {
        this.id = productId();
        this.name = name;
        this.price = price;
        this.description = description
        this.category = category
        this.img = img;
    }

    static getProducts = () => {
        return products;
    }

    postProduct = () => {
        products.push(this)

    }
}

export default Product;
