import { Order } from '../types/orderType';
import Client from '../client';

export class OrderClass {
    async index(): Promise<Order[]> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT * FROM orders;';
            const _result = await _connect.query(_sql);
            _connect.release();
            return _result.rows;
        } catch (error) {
            throw new Error(`Unable to retrive orders: ${error}`)
        }
    }
    async show(id: number): Promise<Order> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT * FROM orders WHERE id=($1);';
            const _result = await _connect.query(_sql, [id]);
            _connect.release();
            return _result.rows[0];
        } catch (error) {
            throw new Error(`Unable to retrive an order: ${error}`)
        }
    }


    async getOrderByUserId(id: number): Promise<Order> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT * FROM orders WHERE id=($1);';
            const _result = await _connect.query(_sql, [id]);
            _connect.release();
            return _result.rows[0];
        } catch (error) {
            throw new Error(`Unable to retrive an order: ${error}`)
        }
    }




    async create(o: Order): Promise<Order> {
        try {
            const _connect = await Client.connect();
            const _sql = 'INSERT INTO orders (status, user_id, quantity) VALUES ($1, $2, $3) RETURNING *;';
            const _result = await _connect.query(_sql, [o.status, o.user_id, o.quantity]);
            _connect.release();
            return _result.rows[0];
        } catch (error) {
            throw new Error(`Unable to update an order: ${error}`)
        }
    }



    async update(o: Order): Promise<Order> {
        try {
            const _connect = await Client.connect();
            const _sql = 'UPDATE orders SET status=$1, user_id=$2, quantity=$3 WHERE id=$4 RETURNING *;';
            const _result = await _connect.query(_sql, [o.status, o.user_id, o.quantity, o.id]);
            _connect.release();
            return _result.rows[0];
        } catch (error) {
            throw new Error(`Unable to update an order: ${error}`)
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const _connect = await Client.connect();
            const _sql = 'DELETE FROM orders WHERE id=$1;';
            const _result = await _connect.query(_sql, [id]);
            _connect.release();
            return _result.rows[0];
        } catch (error) {
            throw new Error(`Unable To Delete an order : ${error}`)
        }
    }

}