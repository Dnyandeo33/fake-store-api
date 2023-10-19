import User from '../models/user.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

const userController = {
    getHome: (req, res) => {
        res.status(200).render('form', {
            action: '/register',
            btnText: 'Register',
            title: 'Register',
            linkText: 'Login',
            redirect: '/login'
        });
    },

    getLogin: (req, res) => {
        res.status(200).render('form', {
            action: '/login',
            btnText: 'Login',
            title: 'Login',
            linkText: 'Register',
            redirect: '/'
        });
    },

    register: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserById(email);
        if (!emailExist) {
            const isValidateEmail = validateEmail(email);
            const isValidatePassword = validatePassword(password);

            if (isValidateEmail && isValidatePassword) {
                const user = new User(email, password);
                user.addUser();
                res.status(200).redirect('/login')
            } else {
                res.status(409).render('message', {
                    title: 'invalid email or password',
                    message: `Provide valid email & password`,
                    redirect: '/',
                    linkText: 'Register'
                });
            }
        } else {
            res.status(409).render('message', {
                title: 'invalid email or password',
                message: `Email or password not valid`,
                redirect: '/',
                linkText: 'Register'
            });
        }
    },

    login: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserById(email);

        if (!emailExist) {
            res.status(409).render('message', {
                title: 'invalid email or password',
                message: `Provide valid email & password`,
                redirect: '/',
                linkText: 'Register'

            });
        } else {
            if (emailExist.password === password) {
                res.status(200).render('welcome', { title: 'welcome page' })
            } else {
                res.status(409).render('message', {
                    title: 'invalid email or password',
                    message: `Email or password not valid`,
                    redirect: '/',
                    linkText: 'Register'
                });
            }
        }
    }
};

export default userController;
