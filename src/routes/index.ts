import { Router } from "express";
import usersRoute from "./api/users";
const routes = Router();

routes.use('/', usersRoute)

export default routes;