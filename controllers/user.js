import User from "../models/user.js";

const userController = {
    getHome: (req, res) => {
        res.status(200).render('form', { action: '/sing-up', button: "Sign up" })
    },
    singUp: (req, res) => {


    },
    singIn: (req, res) => {
    }
}

export default userController;
