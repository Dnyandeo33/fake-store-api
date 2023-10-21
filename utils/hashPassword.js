import bcrypt from "bcryptjs";

const hashPassword = (password) => {
    const slat = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, slat)
}

export default hashPassword;