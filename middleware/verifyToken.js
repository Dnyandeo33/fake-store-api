import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const { token } = req.cookies
    Jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            res.status(404).render('message', {
                title: 'Not valid',
                message: `login first`,
                redirect: '/login',
                linkText: 'login',
                token: req.cookies.token
            })
        } else {
            next()
        }
    })
}

export default verifyToken;