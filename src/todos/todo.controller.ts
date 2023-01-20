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
            message: "[❌] : Something wrong!!"
        })
    }
}

export const createNewTodo = async (req: Request, res: Response) => {
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

        await newTodo.save()
        res.status(201).json({
            code: 201,
            status: 'CREATED',
            message: "[✅] Todo created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: "[❌] : Something wrong!!"
        })
    }
}


export const getTodoById = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        await Todos.findOne({_id: id}).then((doc) => {
            res.status(200).json({
                code: 200,
                status: "OK",
                data: doc
            })
        }).catch((err) => {
            res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                message: "[❌] : Todo not found"
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: "[❌] : Something wrong!!"
        })
    }
}


export const deleteTodo = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        await Todos.findByIdAndDelete({_id: id}).then((doc) => {
            res.status(200).json({
                code: 200,
                status: "OK",
                message: "[✅] Todo deleted successfully"
            })
        }).catch((err) => {
            res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                message: "[❌] : Todo not found"
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: "[❌] : Something wrong!!"
        })
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    const {id} = req.params
    const todo: ITodo = {...req.body, updated_at: new Date}

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 400,
            status: 'BAD_REQUEST',
            errors: errors.array()
        })
    }

    try {
        await Todos
            .findByIdAndUpdate({_id: id}, todo)
            .then((doc) => {
                res.status(200).json({
                    code: 200,
                    status: "OK",
                    message: "[✅] Todo update successfully"
                })
            })
            .catch((err) => {
                res.status(404).json({
                    code: 404,
                    status: 'NOT_FOUND',
                    message: "[❌] : Todo not found"
                })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            status: 'INTERNAL_SERVER_ERROR',
            message: "[❌] : Something wrong!!"
        })
    }
}

