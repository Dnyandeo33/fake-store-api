import { v4 as userID } from "uuid";

const users = [
    {
        id: '1',
        email: "dnyanu.waghunde@gmail.com",
        password: "dnyanu123"
    }
];

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    getUser = () => {
        return users
    };

    getUserById = (id) => {
        return users.find((user) => user.id === id)
    }
};

export default User;