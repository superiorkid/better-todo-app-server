import {Schema, model} from "mongoose";
import IAuth from "../types/IAuth";

const AuthSchema = new Schema<IAuth>({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

export default model('Auth', AuthSchema)