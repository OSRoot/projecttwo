import { Request, Response, NextFunction } from 'express'
import Error from '../interfaces/errorInterface';
// Create a function to handle specific Error
const ErrorHandle = (err: Error, _request: Request, response: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "⛔ Unexpected Error, Go Back";
    console.log(err)
    response.status(status).json({
        status, message
    })


}


export default ErrorHandle;