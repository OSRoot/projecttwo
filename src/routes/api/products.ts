import { Router } from "express";
import * as controller from '../../controllers/products';

const productsRoute = Router();
productsRoute.route('/products')
    .get(controller.getProducts)
    .post(controller.createProduct)
    .patch(controller.updateProduct)

productsRoute.route('/products/:id')
    .get(controller.getAproduct)
    .delete(controller.deleteProduct)


export default productsRoute;