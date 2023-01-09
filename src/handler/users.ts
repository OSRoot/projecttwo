import { Request, Response, NextFunction } from "express";
import { User } from "../types/userType";
import { UserClass } from "../model/userModel";
import jwt from "jsonwebtoken";
import config from "../envConfig";
import dotenv from "dotenv";
dotenv.config();

const aUser = new UserClass();

// ###################################################################################
// #### Create a creatorUser function                                        #############
// #### Create a creatorUser function                                        #############
// #### Create a creatorUser function                                        #############
// ###################################################################################
export const creator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = {
      email: req.body.email as string,
      username: req.body.username as string,
      password: req.body.password as string,
    };
    const existUser = await aUser.getUserByName(user.username);
    if (!existUser) {
      if (!user.username) {
        return res.json({
          INFO: "Enter the username",
        });
      }
      const createdUser = await aUser.createUser(user);
      res.json({
        INFO: "✔ Done",
        DATA: createdUser,
        MESSAGE: `✔ Created User ${user.username}`,
      });
    } else {
      res.json({
        INFO: "😊 User already exists",
      });
    }
    // console.log()
  } catch (err) {
    next(err);
  }
};

// ###################################################################################
// #### Create a usergetter function                                     #############
// #### Create a usergetter function                                     #############
// #### Create a usergetter function                                     #############
// ###################################################################################

export const userGetter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as unknown as string;
    // console.log(id)
    const existUser = await aUser.getUserById(id);
    if (existUser) {
      res.json({
        INFO: "✔ Done",
        DATA: existUser,
        MESSAGE: `✔ User Found and Retrived`,
      });
    } else {
      res.json({
        INFO: "😪 Try again with the correct user ID.",
      });
    }
  } catch (err) {
    next(err);
  }
};

// ###################################################################################
// #### Create a usersGetter function                                    #############
// #### Create a usersGetter function                                    #############
// #### Create a usersGetter function                                    #############
// ###################################################################################

// create a users retriver
export const usersGetter = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await aUser.getUsers();
    res.json({
      INFO: "✔ Done",
      DATA: users,
      MESSAGE: "✔ All Users are Retrived , (Not Recommended Action) 👎",
    });
  } catch (err) {
    next(err);
  }
};

// ###################################################################################
// #### Create a userUpdater function                                    #############
// #### Create a userUpdater function                                    #############
// #### Create a userUpdater function                                    #############
// ###################################################################################

// create a user updater
export const userUpdater = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: User = {
      id: req.body.id as string,
      email: req.body.email as string,
      username: req.body.username as string,
      password: req.body.password as string,
    };
    // console.log(user)
    if (user.id) {
      const updatedUser = await aUser.updateUser(user);
      res.json({
        INFO: "✔ Done",
        DATA: updatedUser,
        MESSAGE: `✔ User ${user.username} Info Is Updated`,
      });
    } else {
      res.json({
        INFO: "Can't Update, Please Provide The User Id",
      });
    }
  } catch (err) {
    next(err);
  }
};

// ###################################################################################
// #### Create a userDeleter function                                    #############
// #### Create a userDeleter function                                    #############
// #### Create a userDeleter function                                    #############
// ###################################################################################

// create a deleter function
export const userDeleter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as unknown as string;
    const existUser = await aUser.getUserById(id);
    if (existUser) {
      const user = await aUser.deleteUser(id);
      res.json({
        INFO: "✔ Done",
        DATA: user,
        MESSAGE: `✔ User is Deleted`,
      });
    } else {
      res.json({
        INFO: "User Does not exist.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// ###################################################################################
// #### Create a authenticate function                                   #############
// #### Create a authenticate function                                   #############
// #### Create a authenticate function                                   #############
// ###################################################################################
// create authenticate function

export const authenTicate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userByEmail = await aUser.getUserByEmail(email);
    if (userByEmail) {
      const authenticatingUser = await aUser.authenticateUser(email, password);
      const token = jwt.sign(
        { authenticatingUser },
        config.secret_token as unknown as string
      );
      return res.status(200).json({
        INFO: "✔ Done",
        USER_DATA: { ...authenticatingUser, token },
        MESSAGE: "✔ Logged in Successfully ✔",
      });
    } else {
      res.json({
        INFO: "user info Incorrect 🙂",
      });
    }
  } catch (error) {
    next(error);
  }
};
