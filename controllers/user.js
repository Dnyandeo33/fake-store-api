import bcrypt from "bcryptjs";
import User from '../models/user.js';
import hashPassword from '../utils/hashPassword.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';


const userController = {
    register: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserById(email);
        if (!emailExist) {
            const isValidateEmail = validateEmail(email);
            const isValidatePassword = validatePassword(password);

            if (isValidateEmail && isValidatePassword) {
                const passwordHash = hashPassword(password);
                const user = new User(email, passwordHash);
                user.addUser();
                res.status(302).redirect('/login');
            } else {
                res.status(409).render('message', {
                    title: 'Not valid',
                    message: `Email or password is not valid`,
                    redirect: '/register',
                    linkText: 'Register',
                    isLoggedIn: req.session.isLoggedIn
                });
            }
        } else {
            res.status(409).render('message', {
                title: 'Email already exists',
                message: `This email already taken`,
                redirect: '/login',
                linkText: 'Login',
                isLoggedIn: req.session.isLoggedIn
            });
        }
    },

    login: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserById(email);
        if (!emailExist) {
            res.status(401).render('message', {
                title: 'invalid email or password',
                message: `Invalid email or password`,
                redirect: '/login',
                linkText: 'Login',
                isLoggedIn: req.session.isLoggedIn
            });
        } else {
            bcrypt.compare(password, emailExist.password, (err, isValid) => {
                if (isValid) {
                    req.session.isLoggedIn = true;
                    res.status(302).redirect('/');
                } else {
                    res.status(409).render('message', {
                        title: 'log is failed',
                        message: `Email or password not valid`,
                        redirect: '/',
                        linkText: 'Register',
                        isLoggedIn: req.session.isLoggedIn
                    });
                }
            })
        }
    },

    getRegister: (req, res) => {
        res.status(200).render('form', {
            action: '/register',
            btnText: 'Register',
            title: 'Register',
            linkText: 'Login',
            redirect: '/login',
            isLoggedIn: req.session.isLoggedIn
        });
    },

    getLogin: (req, res) => {
        res.status(200).render('form', {
            action: '/login',
            btnText: 'Login',
            title: 'Login',
            linkText: 'Register',
            redirect: '/',
            isLoggedIn: req.session.isLoggedIn
        });
    },

    logOut: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.status(302).redirect('/');
        });
    }
};

export default userController;
