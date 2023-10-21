const isLoggedIn = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        next();
    } else {
        res.status(302).redirect('/')
    }
}

export default isLoggedIn;