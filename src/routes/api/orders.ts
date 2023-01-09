import { Router } from 'express';
import * as controller from '../../controllers/orders';
import { myDashbordOrder, usersWithOrders, MostExpensive5 } from '../../controllers/dashboard';
const ordersRoute = Router();

ordersRoute.route('/orders')
    .get(controller.getAllOrders)
    .post(controller.createOrder);
ordersRoute.route('/orders/:id')
    .get(controller.getANorder)
    .patch(controller.updateOrder)
    .delete(controller.deleteOrder);
ordersRoute.route('/orders/:id/products')
    .post(controller.addToOrder);

ordersRoute.route('/products_in_order')
    .get(myDashbordOrder);
ordersRoute.route('/users_with_orders')
    .get(usersWithOrders)
ordersRoute.route('/five_expensive')
    .get(MostExpensive5)
export default ordersRoute;