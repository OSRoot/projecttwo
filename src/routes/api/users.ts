import { Router } from "express";
import * as controller from '../../controllers/users';
import { checkTokenValidation } from "../../middlewares/authMiddle";
import dotenv from 'dotenv';
dotenv.config();
const usersRoute = Router();

usersRoute.route('/users')
    .post(controller.creator)
    .get(checkTokenValidation
        , controller.usersGetter);
// the controller that use req.params
usersRoute.route('/users/:id')
    .get(controller.userGetter)
    .patch(controller.userUpdater)
    .delete(controller.userDeleter)

// handle authentication 

usersRoute.route('/login').post(controller.authenTicate)

export default usersRoute;