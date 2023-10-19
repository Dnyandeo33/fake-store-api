import express from "express";
import userController from "../controllers/user.js";
const { getHome, singUp, singIn } = userController;

const router = express.Router();

router.get('/', getHome)
router.post('/sign-up', singUp)
router.post('/sign-in', singIn)

export default router;