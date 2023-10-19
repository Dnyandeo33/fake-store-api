import { v4 as userId } from 'uuid';

const users = [
    {
        id: '1',
        email: 'test@gmail.com',
        password: '12345'
    }
];

class User {
    constructor(email, password) {
        this.id = userId();
        this.email = email;
        this.password = password;
    }

    static getUser = () => {
        return users;
    };

    static getUserById = (email) => {
        return users.find((user) => user.email === email);
    };
    addUser = () => {
        users.push(this);
    };
}

export default User;
