import express, {Router} from 'express'
import {createNewTodo, getAllTodo} from "./todo.controller";
import {body} from 'express-validator'

const router = Router()

router.get('/', getAllTodo)
router.post(
    '/',
    body('title')
        .not()
        .isEmpty()
        .withMessage("title is required"),
    body('todo')
        .not().isEmpty()
        .withMessage("todo is required"),
    createNewTodo
)

export default router