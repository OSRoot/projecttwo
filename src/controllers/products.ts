import { Request, Response, NextFunction } from "express";
import { Product } from "../types/productType";
import { ProductClass } from "../models/productModel";
const aProduct = new ProductClass();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: Product = {
      name: req.body.name as string,
      price: +(req.body.price as string),
    };
    const existProduct = await aProduct.getProductByName(product.name);
    if (!existProduct) {
      if (!product.name) {
        res.json({
          INFO: "PLease Provide the Product Name",
        });
      }
      const newProduct = await aProduct.create(product);
      res.json({
        INFO: "Done",
        DATA: { ...newProduct },
        MESSAGE: "a New Product Is Created Successfully",
      });
    } else {
      res.json({
        INFO: "Product is Already Exists",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAproduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const productExists = await aProduct.show(+id);
    if (productExists) {
      res.json({
        INFO: "Done",
        DATA: { ...productExists },
        MESSAGE: "A Product is retrived Successfully",
      });
    } else {
      res.json({
        INFO: "NO Such a Product",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProduct = await aProduct.index();
    res.json({
      INFO: "Done",
      DATA: allProduct,
      MESSAGE: "All Products are Retrived Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: Product = {
      id: +(req.body.id as string),
      name: req.body.name as string,
      price: +(req.body.price as string),
    };
    // const existProduct = await aProduct.show(
    //   +(req.body.id as unknown as string)
    // );
    if (product.id) {
      if (!product.name) {
        res.json({
          INFO: "PLease Provide the Product Name",
        });
      }
      const updatedProduct = await aProduct.update(product);
      return res.json({
        INFO: "Done",
        DATA: { ...updatedProduct },
        MESSAGE: "A Product is Updated Successfully",
      });
    } else {
      res.json({
        INFO: "No Changes, Where is is the ID",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const productExists = await aProduct.show(+id);
    if (productExists) {
      const deletedProduct = await aProduct.delete(id);
      res.json({
        INFO: "Done",
        DATA: { ...deletedProduct },
        MESSAGE: "A Product has been Deleted Successfully",
      });
    } else {
      return res.json({
        INFO: "No Such Product",
      });
    }
  } catch (error) {
    next(error);
  }
};
