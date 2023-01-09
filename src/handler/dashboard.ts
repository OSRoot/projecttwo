import { Request, Response, NextFunction } from "express";
// import { Order } from '../types/orderType';
import { DashBoardOrders } from "../services/dashboard";
const mydashboard = new DashBoardOrders();
export const myDashbordOrder = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myOrders = await mydashboard.myOrders();
    res.json({
      INFO: "Done",
      DATA: myOrders,
      MESSAGE: "Your Active orders",
    });
  } catch (err) {
    next(err);
  }
};

export const usersWithOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await mydashboard.usersWithOrders();
    res.json({
      INFO: "Done",
      DATA: users,
      MESSAGE: "Users With orders",
    });
  } catch (error) {
    next(error);
  }
};

export const MostExpensive5 = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expensiveFive = await mydashboard.fiveExpensive();
    res.json({
      INFO: "Done",
      DATA: expensiveFive,
      MESSAGE: "Retrived the Most Expensive 5 products",
    });
  } catch (error) {
    next(error);
  }
};
