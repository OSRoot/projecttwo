import { Router } from "express";
import * as controller from '../../handler/products';
import { MostExpensive5 } from "../../handler/dashboard";
import { checkTokenValidation } from "../../middlewares/authMiddle";

const productsRoute = Router();
productsRoute.route('/products')
    .get(controller.getProducts)
    .post(checkTokenValidation, controller.createProduct)

productsRoute.route('/products/:id')
    .get(controller.getAproduct)
    .patch(checkTokenValidation, controller.updateProduct)
    .delete(checkTokenValidation, controller.deleteProduct)
productsRoute.route('/five_expensive')
    .get(MostExpensive5)

export default productsRoute;

