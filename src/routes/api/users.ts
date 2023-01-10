import { Router } from "express";
import * as controller from '../../handler/users';
import { checkTokenValidation } from "../../middlewares/authMiddle";
import dotenv from 'dotenv';
dotenv.config();
const usersRoute = Router();

usersRoute.post('/users', controller.creator);
usersRoute.get('/users', checkTokenValidation, controller.usersGetter);
// the controller that use req.params
usersRoute.route('/users/:id')
    .get(controller.userGetter)
    .patch(controller.userUpdater)
    .delete(controller.userDeleter)

// handle authentication 

usersRoute.route('/login').post(controller.authenTicate)

export default usersRoute;

//10- GET http://localhost/api/users
//10- POST http://localhost/api/users
//10- GET http://localhost/api/users/:id
//10- PATCH http://localhost/api/users/:id
//10- DELETE http://localhost/api/users/:id
//10- POST http://localhost/api/login
