import supertest from "supertest";
// import express, { Application } from 'express';
import { app } from "../server";

const request = supertest(app);

describe("Test orders Route EndPoints: Suite 1", (): void => {
  it("Check Specific Error on /api/users endpoit: (unauthorized without token): ", async () => {
    const response = await request.get("/api/users");
    expect(response.status).toBe(401);
  });

  it("The /api/orders Route can be reached easily: ", async () => {
    const response = await request.get("/api/orders");
    expect(response.status).toBe(200);
  });

  it("The /api/products is reachable: ", async () => {
    const response = await request.get("/api/products");
    expect(response.status).toBe(200);
  });

  it("");
});
