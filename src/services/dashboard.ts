import Client from "../client";
import { Order } from "../types/orderType";


export class DashBoardOrders {
    async myOrders(): Promise<{ name: string, price: number, order_id: string }[]> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id=order_products.id;'
            const _result = _connect.query(_sql);
            _connect.release();
            return (await _result).rows
        } catch (error) {
            throw new Error(`Unable to retrive orders or products: ${error}`)
        }
    }


    async usersWithOrders(): Promise<{ email: string, username: string }[]> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT email, username FROM users INNER JOIN orders ON users.id=orders.user_id;'
            const _result = _connect.query(_sql);
            _connect.release();
            return (await _result).rows
        } catch (error) {
            throw new Error(`Unable to retrive orders or products: ${error}`)
        }
    }

    // most expensive 5

    async fiveExpensive(): Promise<{ name: string, price: number }[]> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5;'
            const _result = _connect.query(_sql);
            _connect.release();
            return (await _result).rows
        } catch (error) {
            throw new Error(`Unable to retrive orders or products: ${error}`)
        }
    }


}