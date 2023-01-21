import {JwtPayload} from "jsonwebtoken";
import IToken from "./IToken";
import { Request } from "express";

export default interface CustomRequest extends Request{
    userId?: string
}