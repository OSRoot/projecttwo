import { Request, Response, NextFunction } from "express";
import { Order } from "../types/orderType";
import orderProduct from "../types/orderProductsType";
import { OrderClass } from "../models/orderModel";
const anOrder = new OrderClass();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order: Order = {
      status: req.body.status as string,
      user_id: +(req.body.user_id as string),
    };
    const existedOrder = await anOrder.getOrderByUserId(order.user_id);
    if (!existedOrder) {
      const createdOrder = await anOrder.create(order);
      res.json({
        INFO: "Done",
        DATA: createdOrder,
        MESSAGE: "Created an Order Successfully",
      });
    } else {
      res.json({
        INFO: "Order is exist , Check Your Cart",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getANorder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = +(req.params.id as string);
    const existOrder = await anOrder.show(id);
    if (existOrder) {
      res.json({
        INFO: "Found the order",
        DATA: { ...existOrder },
        MESSAGE: "Retrived an Order Successfully",
      });
    } else {
      res.json({
        INFO: "No Such Order, Add some orders to the cart first",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allOrders = await anOrder.index();
    res.json({
      INFO: "Done",
      DATA: { ...allOrders },
      MESSAGE: "Retrived All Orders Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order: Order = {
      status: req.body.status as string,
      user_id: +(req.body.user_id as string),
    };
    const id = +(req.body.id as string);
    const existOrder = await anOrder.show(id);
    if (existOrder) {
      const updatedOrder = await anOrder.update(order);
      res.json({
        INFO: "Done",
        DATA: { ...updatedOrder },
        MESSAGE: "Order has been Updated Successfully",
      });
    } else {
      res.json({
        INFO: "No such Order, Add order to cart first",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = +(req.params.id as string);
    const existOrder = await anOrder.show(id);
    if (existOrder) {
      const deletedOrder = await anOrder.delete(id);
      res.json({
        INFO: "Done",
        DATA: { ...deletedOrder },
        MESSAGE: "Order Deleted Successfully",
      });
    } else {
      res.json({
        INFO: "Order Doesn't Exist, Add order to cart first",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addToOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderToAdd: orderProduct = {
      quantity: req.body.quantity,
      product_id: req.body.product_id as string,
      order_id: req.params.id as string,
    };
    const addingProduct = await anOrder.addToOrderCart(
      orderToAdd.quantity,
      orderToAdd.order_id,
      orderToAdd.product_id
    );
    res.json({
      INFO: "Done",
      DATA: { ...addingProduct },
      MESSAGE: "A New Product added to cart Succesfully",
    });
  } catch (error) {
    next(error);
  }
};
