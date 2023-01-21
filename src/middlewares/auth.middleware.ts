import {Request, Response, NextFunction} from 'express'
import jwt, {JwtPayload, Secret, VerifyErrors} from 'jsonwebtoken'
import dotenv from "dotenv";

import CustomRequest from "../types/ICustomRequest";
import IToken from "../types/IToken";

dotenv.config()

export default (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]!
        const decoded = <IToken>jwt.verify(token, process.env.SECRET_KEY as Secret)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({
            code: 401,
            status: "UNAUTHORIZED",
            message: "Authentication failed"
        })
    }
}