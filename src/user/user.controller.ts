import {Request, Response} from "express";
import {validationResult} from "express-validator";
import bcrypt from 'bcrypt'
import jwt, {Secret} from 'jsonwebtoken'
import dotenv from "dotenv";

import AuthModel from "./user.model";
import IAuth from "../types/IAuth";
import CustomRequest from "../types/ICustomRequest";

dotenv.config()

export const register = async (req: Request, res: Response) => {
    const { username, email, password }  = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 400,
            status: 'BAD_REQUEST',
            errors: errors.array()
        })
    }

    try {
        // check if email is exists
        const userExists = await AuthModel.findOne({email})
        if (userExists) {
            return res.status(409).json({
                code: 409,
                status: "CONFLICT",
                message: "[❌] User already registered"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser: IAuth = new AuthModel({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({
            code: 201,
            status: "CREATED",
            message: "[✅] User created successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong"
        })
    }
}


export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    try {

        // check if user exists
        const user = await AuthModel.findOne({email}) as IAuth
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: "NOT_FOUND",
                message: "[❌] User not found"
            })
        }


        // check if password match
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                code: 401,
                status: 'UNAUTHORIZED',
                message: "[❌] Password incorrect"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY as Secret, {
            expiresIn: "1d"
        })

        res.status(200).json({
            code: 200,
            status: "OK",
            message: "User logging in successfully",
            body: {
                token
            }
        })

    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong"
        })
    }
}


export const getUserInfo = async (req: CustomRequest, res: Response) => {
    const user = req.userId
    if (!user) {
        return res.json({
            message: "user is empty"
        })
    }

    res.json({
        message: "user is logged in",
        id: user
    })
}

