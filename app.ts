import express, {Express, Request, Response} from 'express'
import mongoose from "mongoose"
import bodyParser from "body-parser";

import connectDB from "./src/config/database";
import TodoRoute from "./src/todos/todo.route";
import AuthRoute from "./src/auth/auth.route";

const app: Express = express()

// parse application/x-www-form-urlloaded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

mongoose.set('strictQuery', false)

connectDB()

app.use('/todos', TodoRoute)
app.use('/auth', AuthRoute)

app.get('/', (req:Request, res: Response) => {
    res.status(200).json({
        message: "John doe"
    })
})

export default app


