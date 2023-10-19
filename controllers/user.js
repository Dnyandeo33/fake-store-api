import User from "../models/user.js";
import validateEmail from "../utils/validateEmail.js";
import validatePassword from "../utils/validatePassword.js";

const userController = {
    getHome: (req, res) => {
        res.status(200).render('form', { action: '/sign-up', button: "Sign up" })
    },

    singUp: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserById(email);
        if (!emailExist) {
            const isValidateEmail = validateEmail(email)
            const isValidatePassword = validatePassword(password)

            if (isValidateEmail && isValidatePassword) {

                const user = new User(email, password);
                user.addUser()
                res.status(200).render('welcome', { message: `welcome ${email}` })
            } else {
                res.status(409).render('message', { title: 'Not valid email or password', message: `Provide valid email & password` })

            }
        } else {
            res.status(409).render('message', { message: `Email or password not valid` })
        }

    },

    singIn: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserById(email);

        if (!emailExist) {
            res.status(409).render('message', { message: `Email is not existed` })
        } else {
            if (emailExist.password === password) {
                res.status(200).render('welcome', { message: `welcome ${email}` })
            }
        }
    }
}

export default userController;
