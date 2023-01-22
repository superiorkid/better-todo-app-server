import {Document, Types} from "mongoose";

export default interface ITodo extends Document{
    title: string,
    todo: string,
    is_completed: boolean,
    created_at: Date,
    updated_at: Date
    author: Types.ObjectId
}