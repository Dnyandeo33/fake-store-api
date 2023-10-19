import express from 'express';
import userController from '../controllers/user.js';
const { getHome, register, login, getLogin, getMain } = userController;

const router = express.Router();

router.route('/').get(getHome)
router.route('/login').get(getLogin).post(login)
router.route('/register').post(register)

export default router;
