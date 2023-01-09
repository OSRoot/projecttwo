import { Router } from 'express';
import * as controller from '../../handler/orders';
import { myDashbordOrder, usersWithOrders, MostExpensive5 } from '../../handler/dashboard';
import { checkTokenValidation } from '../../middlewares/authMiddle';
const ordersRoute = Router();

ordersRoute.route('/orders')
    .get(checkTokenValidation, controller.getAllOrders)
    .post(checkTokenValidation, controller.createOrder);
ordersRoute.route('/orders/:id')
    .get(checkTokenValidation, controller.getANorder)
    .patch(checkTokenValidation, controller.updateOrder)
    .delete(checkTokenValidation, controller.deleteOrder);
ordersRoute.route('/orders/:id/products')
    .post(checkTokenValidation, controller.addToOrder);

ordersRoute.route('/products_in_order')
    .get(checkTokenValidation, myDashbordOrder);
ordersRoute.route('/users_with_orders')
    .get(checkTokenValidation, usersWithOrders)
ordersRoute.route('/five_expensive')
    .get(MostExpensive5)
export default ordersRoute;