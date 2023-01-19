import {Request, Response} from "express";
import {validationResult} from 'express-validator'

import Todos from "./todo.model";
import ITodo from "../types/ITodo";

export const getAllTodo = async (req: Request, res:Response) => {
    try {
        const todos: Array<ITodo> = await Todos.find()
        res.status(200).json({
            code: 200,
            status: "OK",
            data: todos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: "INTERNAL_SERVER_ERROR",
            message: "❌[error] : Something wrong!!"
        })
    }
}

export const createNewTodo = (req: Request, res: Response) => {
    const { title, todo } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: errors.array()
            })
    }

    try {
        const newTodo: ITodo = new Todos({
            title,
            todo
        })

        newTodo.save()
        res.status(201).json({
            code: 201,
            status: 'CREATED',
            message: "✅ Todo created successfylly"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: "❌[error] : Something wrong!!"
        })
    }
}