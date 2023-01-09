import { Router } from "express";
import * as controller from '../../controllers/products';

const productsRoute = Router();
productsRoute.route('/products')
    .get(controller.getProducts)
    .post(controller.createProduct)

productsRoute.route('/products/:id')
    .get(controller.getAproduct)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct)


export default productsRoute;