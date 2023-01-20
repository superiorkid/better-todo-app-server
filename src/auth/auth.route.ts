import {register, login} from "./auth.controller";
import {Router} from "express";
import {body} from "express-validator";

const router = Router()

router.post(
    "/register",
    body("username").not().isEmpty().withMessage("Username required"),
    body('email').isEmail(),
    body('password').isLength({min: 5}).withMessage("password length min 5"),
    register
)
router.post("/login", login)

export default router