import { Router } from 'express';
import * as controller from '../../controllers/orders';

const ordersRoute = Router();

ordersRoute.route('/orders')
    .get(controller.getAllOrders)
    .post(controller.createOrder);
ordersRoute.route('/orders/:id')
    .get(controller.getANorder)
    .patch(controller.updateOrder)
    .delete(controller.deleteOrder)



export default ordersRoute;