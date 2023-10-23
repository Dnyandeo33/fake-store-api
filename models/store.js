import { v4 as productId } from 'uuid';

const corses = [
    {
        id: '1',
        name: 'JavaScript',
        price: '100',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        img: 'https://emaillistvalidation.com/blog/content/images/2023/10/JavaScript-Symbol-1.png'
    },
    {
        id: '2',
        name: 'React',
        price: '120',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        img: 'https://miro.medium.com/v2/resize:fit:1050/1*i3hzpSEiEEMTuWIYviYweQ.png'
    }
];

class Corse {
    constructor(name, price, description, img) {
        this.id = productId();
        this.name = name;
        this.price = price;
        this.description = description
        this.img = img;
    }

    static getProducts = () => {
        return corses;
    }

    postProduct = () => {
        corses.push(this)

    }
}

export default Corse;
