import supertest from "supertest";
// import express, { Application } from 'express';
import { app } from "../server";
import { creator, userGetter, userDeleter, userUpdater, usersGetter } from "../handler/users";
const request = supertest(app);
import { User } from "../types/userType";
import { UserClass } from "../model/userModel";
const aUser = new UserClass();


// Test Basic apis and the availability condition (token required)
describe("Test users Route EndPoints: Suite 1", (): void => {
  it("Check Specific Error on /api/users endpoit: (unauthorized without token): ", async () => {
    const response = await request.get("/api/users");
    expect(response.status).toBe(401);
  });

  it("The /api/orders Route can be reached if authorized with correct user token: ", async () => {
    const response = await request.get("/api/orders");
    expect(response.status).toBe(401);
  });

  it("The /api/products is reachable: ", async () => {
    const response = await request.get("/api/products");
    expect(response.status).toBe(200);
  });

  it("");
});

describe("Test the Models: Suite 2: ", (): void => {
  it("Able to Create User: ", async () => {
    const user: User = {
      email: "some@test.com",
      username: "someTest",
      password: "password123"
    }
    const createdUser = await aUser.createUser(user);
    expect(createdUser.email).toBe(user.email);
  })


})