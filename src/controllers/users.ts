import { Request, Response, NextFunction } from 'express';
import { User } from "../types/userType";
import { UserClass } from "../models/userModel";
import jwt from 'jsonwebtoken';
import config from '../envConfig';

const aUser = new UserClass();


// Create a creator function
export const creator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const user: User = {

            email: req.body.email as string,
            username: req.body.username as string,
            password: req.body.password as string
        }
        const existUser = await aUser.getUserByName(user.username);
        if (!existUser) {
            const createdUser = await aUser.createUser(user)
            res.json({
                INFO: "✔ Done",
                DATA: createdUser,
                MESSAGE: `✔ Created User ${user.username}`
            })
        } else {
            res.json({
                INFO: "😊 User already exists"
            })
        }
        // console.log()

    } catch (err) {
        next(err)
    }
}
// create a user Getter
export const userGetter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as unknown as string
        // console.log(id)
        const existUser = await aUser.getUserById(id);
        if (existUser) {
            res.json({
                INFO: "✔ Done",
                DATA: existUser,
                MESSAGE: `✔ User Found and Retrived`
            })
        } else {
            res.json({
                INFO: "😪 Try again with the correct user ID."
            })
        }

    } catch (err) {
        next(err)
    }
}
// create a users retriver 
export const usersGetter = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await aUser.getUsers();
        res.json({
            INFO: "✔ Done",
            DATA: users,
            MESSAGE: "✔ All Users are Retrived , (Not Recommended Action) 👎"
        })
    } catch (err) {
        next(err)
    }
}
// create a user updater
export const userUpdater = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: User = {
            id: req.body.id as string,
            email: req.body.email as string,
            username: req.body.username as string,
            password: req.body.password as string
        }
        // console.log(user)
        if (user.id) {
            const updatedUser = await aUser.updateUser(user);
            res.json({
                INFO: "✔ Done",
                DATA: updatedUser,
                MESSAGE: `✔ User ${user.username} Info Is Updated`
            })
        } else {
            res.json({
                INFO: "Can't Update, Please Provide The User Id"
            })
        }

    } catch (err) {
        next(err)
    }
}


// create a deleter function
export const userDeleter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as unknown as string;
        const existUser = await aUser.getUserById(id)
        if (existUser) {
            const user = await aUser.deleteUser(id);
            res.json({
                INFO: "✔ Done",
                DATA: user,
                MESSAGE: `✔ User is Deleted`
            })
        } else {
            res.json({
                INFO: "User Does not exist."
            })
        }
    } catch (error) {
        next(error)
    }
}
// create authenticate function

export const authenTicate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
            password
        } = req.body;
        const authenticatingUser = await aUser.authenticateUser(email, password)
        // make / generate token using jsonwebtoken
        const token = jwt.sign({ authenticatingUser }, (config.secret_token as unknown) as string);

        if (!authenticatingUser) {
            return res.status(401).json({
                INFO: "Error",
                MESSAGE: "Incorrect username or password, 🙄Try Again🙄"
            })
        }
        return res.status(200).json({
            INFO: "✔ Done",
            USER_DATA: authenticatingUser, token,
            MESSAGE: "✔ Logged in Successfully ✔"
        })

    } catch (error) {
        next(error)
    }
}