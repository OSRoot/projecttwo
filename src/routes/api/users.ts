import { Router } from "express";
import * as controller from '../../controllers/users';
const usersRoute = Router();

usersRoute.route('/users')
    .post(controller.creator)
    .get(controller.usersGetter);
// the controller that use req.params
usersRoute.route('/users/:id')
    .get(controller.userGetter)
    .patch(controller.userUpdater)
    .delete(controller.userDeleter)

export default usersRoute;