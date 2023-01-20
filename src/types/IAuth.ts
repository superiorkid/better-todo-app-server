import {Document} from "mongoose";

export default interface IAuth extends Document {
    username: string
    email: string
    password: string
}