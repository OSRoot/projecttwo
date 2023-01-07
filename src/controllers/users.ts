import express, { Request, Response, NextFunction } from 'express';
import { User } from "../types/userType";
import { UserClass } from "../models/userModel";
import config from '../envConfig';
const aUser = new UserClass()

// Create a creator function
export const creator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const user = await aUser.createUser(req.body)
        res.json({
            INFO: "Done",
            DATA: { ...user },
            MESSAGE: "Created User Sucessfully"
        })

    } catch (error) {
        next(error)
    }
}

