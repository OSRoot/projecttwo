import supertest from "supertest";
import { app } from '../server';

const request = supertest(app);


describe("Test the Users Route Endpoint: ", () => {
    it("Can't get the /api/users Without token:", async () => {
        const res = await request.get('/api/users');
        expect(res.statusCode).toBe(401);
    });

    it("Gets the products Route Endpoint:", async () => {
        const res = await request.get('/api/products');
        expect(res.statusCode).toBe(200)
    });

    it("gets the api for creating a user: ", async () => {
        const res = await request.post('/api/users');
        expect(res.statusCode).toBe(200)
    });

    it("Gets the most expensive 5 :", async () => {
        const res = await request.get('/api/five_expensive');
        expect(res.statusCode).toEqual(200);
    });

    it("Gets my Dashboard Orders: ", async () => {
        const res = await request.get('/api/products_in_order')
        expect(res.statusCode).toBe(200);
    })

    it("Gets the Route for creating an order only with token: ", async () => {
        const res = await request.post('/api/orders');
        expect(res.statusCode).toEqual(401);

    })
})