import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import User from '../models/user.js';
import hashPassword from '../utils/hashPassword.js';
import matchPassword from "../utils/matchPassword.js";
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

const userController = {
    register: (req, res) => {
        const { email, password, rePassword } = req.body;
        const emailExist = User.getUserById(email);
        if (!emailExist) {
            const isValidateEmail = validateEmail(email);
            const isValidatePassword = validatePassword(password);
            const verifyPassword = matchPassword(password, rePassword)

            if (isValidateEmail && isValidatePassword && verifyPassword) {
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
                    token: req.cookies.token
                });
            }
        } else {
            res.status(409).render('message', {
                title: 'Email already exists',
                message: `This email already taken`,
                redirect: '/login',
                linkText: 'Login',
                token: req.cookies.token
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
                token: req.cookies.token
            });
        } else {
            bcrypt.compare(password, emailExist.password, (err, isValid) => {
                if (isValid) {
                    const token = Jwt.sign({ user: emailExist }, process.env.TOKEN_SECRET);
                    if (token) {
                        res.cookie('token', token, { httpOnly: true });
                        res.status(302).redirect('/');
                    } else {
                        res.status(401).render('message', {
                            title: 'Not valid',
                            message: `Invalid token`,
                            redirect: '/login',
                            linkText: 'Login',
                            token: req.cookies.token
                        })
                    }
                } else {
                    res.status(409).render('message', {
                        title: 'log is failed',
                        message: `Email or password not valid`,
                        redirect: '/',
                        linkText: 'Register',
                        token: req.cookies.token
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
            token: req.cookies.token
        });
    },

    getLogin: (req, res) => {
        res.status(200).render('form', {
            action: '/login',
            btnText: 'Login',
            title: 'Login',
            linkText: 'Register',
            redirect: '/',
            token: req.cookies.token
        });
    },

    logOut: (req, res) => {
        res.clearCookie("token");
        res.status(302).redirect('/')

    }
};

export default userController;
