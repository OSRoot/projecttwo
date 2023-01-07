import { Router, Request, Response } from "express";
const usersRoute = Router();

usersRoute.get('/', (_req: Request, res: Response) => {
    res.json({
        Info: "This is Users Route",
        Message: "It Works"
    })
})

export default usersRoute;