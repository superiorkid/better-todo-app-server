import mongoose, {Schema, model} from "mongoose";
import ITodo from "../types/ITodo";

const TodoSchema = new Schema<ITodo>({
    title: {type: String, required: true},
    todo: {type: String, required: true},
    is_completed: {type: Boolean, default:false},
    created_at: {type: Date, default:Date.now},
    updated_at: {type: Date, default:Date.now}
})

export default model("Todo", TodoSchema)

