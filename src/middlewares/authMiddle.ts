import express, { Request, Response, NextFunction } from 'express'
import { UserClass } from "../models/userModel";
import { User } from '../types/userType';
import jwt from 'jsonwebtoken';
const aUser = new UserClass();

const authenTicate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        const existUser = await aUser.getUserByName(user.username);


    } catch (error) {
        next(error)
    }
}
