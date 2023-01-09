import { Order } from "../types/orderType";
import Client from "../client";
// import orderProduct from "../types/orderProductsType";
export class OrderClass {
  async index(): Promise<Order[]> {
    try {
      const _connect = await Client.connect();
      const _sql = "SELECT * FROM orders;";
      const _result = await _connect.query(_sql);
      _connect.release();
      return _result.rows;
    } catch (error) {
      throw new Error(`Unable to retrive orders: ${error}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const _connect = await Client.connect();
      const _sql = "SELECT * FROM orders WHERE id=($1);";
      const _result = await _connect.query(_sql, [id]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Unable to retrive an order: ${error}`);
    }
  }

  async getOrderByUserId(id: number): Promise<Order> {
    try {
      const _connect = await Client.connect();
      const _sql = "SELECT * FROM orders WHERE id=($1);";
      const _result = await _connect.query(_sql, [id]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Unable to retrive an order: ${error}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const _connect = await Client.connect();
      const _sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;";
      const _result = await _connect.query(_sql, [o.status, o.user_id]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update an order: ${error}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      const _connect = await Client.connect();
      const _sql =
        "UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *;";
      const _result = await _connect.query(_sql, [o.status, o.user_id, o.id]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update an order: ${error}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const _connect = await Client.connect();
      const _sql = "DELETE FROM orders WHERE id=$1;";
      const _result = await _connect.query(_sql, [id]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Unable To Delete an order : ${error}`);
    }
  }

  async addToOrderCart(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<Order> {
    try {
      const _connect = await Client.connect();
      const _sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;";
      const _result = await _connect.query(_sql, [
        quantity,
        order_id,
        product_id,
      ]);
      const _order = _result.rows[0];
      return _order;
    } catch (error) {
      throw new Error(
        `Unable to add product: ${product_id} To order : ${order_id} ===>>> ${error}`
      );
    }
  }
}
