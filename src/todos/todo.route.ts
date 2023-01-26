import express, {Router} from 'express'
import {
    createNewTodo,
    deleteTodo,
    getAllTodo,
    getCompleteTodo,
    getIncompleteTodo,
    getTodoById,
    updateTodo
} from "./todo.controller";
import {body} from 'express-validator'
import authMiddleware from "../middlewares/auth.middleware";

const router = Router()

router.get('/',authMiddleware, getAllTodo)
router.get('/complete', authMiddleware, getCompleteTodo)
router.get('/incomplete', authMiddleware, getIncompleteTodo)
router.post(
    '/',
    body('title')
        .not()
        .isEmpty()
        .withMessage("title is required"),
    body('todo')
        .not().isEmpty()
        .withMessage("todo is required"),
    authMiddleware,
    createNewTodo
)
router.get('/:id', getTodoById)
router.delete('/:id', deleteTodo)
router.put(
    "/:id",
    updateTodo
)


export default router