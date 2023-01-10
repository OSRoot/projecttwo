import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Error from "../interfaces/errorInterface";
import config from "../envConfig";
import dotenv from "dotenv";
dotenv.config();

const NextError = (next: NextFunction) => {
  const err: Error = new Error(`Faild login: try Again`);
  err.status = 401; // unauthorized
  err.message = "Invalid token or unauthorized request";
  next(err);
};

export const checkTokenValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const secret: string = config.secret_token as unknown as string;
    const auth_header = req.get("Authorization");
    if (auth_header) {
      const token_type = auth_header.split(" ")[0].toLowerCase();

      const token = auth_header.split(" ")[1];
      if (token && token_type) {
        const verified = jwt.verify(token, secret);
        if (verified) {
          next();
        } else {
          // failed auth
          NextError(next);
        }
      } else {
        // type not bearer
        NextError(next);
      }
    } else {
      // no token
      NextError(next);
    }
  } catch (err) {
    console.log(`Catch Error`);
    NextError(next);
  }
};
