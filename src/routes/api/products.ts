import { Router } from "express";
import * as controller from '../../handler/products';
import { MostExpensive5 } from "../../handler/dashboard";

const productsRoute = Router();
productsRoute.route('/products')
    .get(controller.getProducts)
    .post(controller.createProduct)

productsRoute.route('/products/:id')
    .get(controller.getAproduct)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct)
productsRoute.route('/five_expensive')
    .get(MostExpensive5)

export default productsRoute;