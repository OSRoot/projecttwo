import { Product } from '../types/productType';
import Client from '../client';

export class ProductClass {
    async index(): Promise<Product[]> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT * FROM products;';
            const _result = await _connect.query(_sql);
            _connect.release();
            return _result.rows;
        } catch (error) {
            throw new Error(`Unable to retrive items: ${error}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT * FROM products WHERE id=($1);';
            const _result = await _connect.query(_sql, [id]);
            _connect.release();
            return _result.rows[0];

        } catch (error) {
            throw new Error(`Unable to retrive an item : ${error}`)
        }

    }

    async getProductByName(name: string): Promise<Product> {
        try {
            const _connect = await Client.connect();
            const _sql = 'SELECT * FROM products WHERE name=($1);';
            const _result = await _connect.query(_sql, [name]);
            _connect.release();
            return _result.rows[0];

        } catch (error) {
            throw new Error(`Unable to retrive an item : ${error}`)
        }

    }

    async create(p: Product): Promise<Product> {
        try {
            const _connect = await Client.connect();
            const _sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;';
            const _result = await _connect.query(_sql, [p.name, p.price]);
            _connect.release();
            return _result.rows[0]
        } catch (error) {
            throw new Error(`Unable to Create a new product: ${error}`)
        }

    }

    async update(p: Product): Promise<Product> {
        try {
            const _connect = await Client.connect();
            const _sql = 'UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *;'
            const _result = await _connect.query(_sql, [p.name, p.price, p.id]);
            _connect.release();
            return _result.rows[0];
        } catch (error) {
            throw new Error(`Unable to Update Product Info: ${error}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const _connect = await Client.connect();
            const _sql = 'DELETE FROM products WHERE id=$1;';
            const _result = await _connect.query(_sql, [id]);
            _connect.release();
            return _result.rows[0];
        } catch (error) {
            throw new Error(`Unable To Delete an item : ${error}`)
        }
    }
}