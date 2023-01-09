import { Router } from "express";
import usersRoute from "./api/users";
import productsRoute from "./api/products";
import ordersRoute from "./api/orders";
const routes = Router();

routes.use('/', usersRoute)
routes.use('/', productsRoute)
routes.use('/', ordersRoute)
export default routes;