import {register, login, getUserInfo} from "./user.controller";
import {Router} from "express";
import {body} from "express-validator";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router()

router.post(
    "/register",
    body("username").not().isEmpty().withMessage("Username required"),
    body('email').isEmail(),
    body('password').isLength({min: 5}).withMessage("password length min 5"),
    body("confirm_password").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password")
        }

        return true
    }),
    register
)
router.post("/login", login)
router.get('/user-info', authMiddleware, getUserInfo)

export default router