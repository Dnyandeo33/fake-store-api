import { v4 as userID } from "uuid";

const users = [
    {
        id: '1',
        email: "test@gmail.com",
        password: "Test@123"
    }
];

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static getUser = () => {
        return users
    };

    static getUserById = (id) => {
        return users.find((user) => user.id === id)
    }
    addUser = () => {
        users.push(this)
    }
};

export default User;