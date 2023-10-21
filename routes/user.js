import express from 'express';
import userController from '../controllers/user.js';
const { register, login, getLogin, getRegister, logOut } = userController;

const router = express.Router();

router.route('/login').get(getLogin).post(login);
router.route('/register').get(getRegister).post(register);
router.get('/log-out', logOut);

export default router;
