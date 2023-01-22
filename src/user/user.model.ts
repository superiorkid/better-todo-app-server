import {Schema, model} from "mongoose";
import IAuth from "../types/IAuth";

const AuthSchema = new Schema<IAuth>({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    todos: [{type: Schema.Types.ObjectId, ref: "Todo"}]
})

export default model('User', AuthSchema)