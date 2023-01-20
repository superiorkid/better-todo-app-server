import express, {Router} from 'express'
import {createNewTodo, deleteTodo, getAllTodo, getTodoById, updateTodo} from "./todo.controller";
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
router.get('/:id', getTodoById)
router.delete('/:id', deleteTodo)
router.put(
    "/:id",
    body("title")
        .not()
        .isEmpty()
        .withMessage("title is required"),
    body('todo')
        .not()
        .isEmpty()
        .withMessage("todo is required"),
    updateTodo
)


export default router