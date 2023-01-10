// ######################################################################################
// import User model
// ######################################################################################
import { User } from "../types/userType";
import { UserClass } from "../model/userModel";
const aUser = new UserClass();
// ######################################################################################
// import the Product model
// ######################################################################################
import { Product } from "../types/productType";
import { ProductClass } from "../model/productModel";
const aProduct = new ProductClass();
// ######################################################################################
// import the Order model
// ######################################################################################
import { Order } from "../types/orderType";
import { OrderClass } from "../model/orderModel";
const anOrder = new OrderClass();


// ######################################################################################
// ######################################################################################
//                              TESTING THE User Model here 
// ######################################################################################
// ######################################################################################


describe("Test User Model: ", () => {
    it("should have an index method: ", () => {
        expect(aUser.getUsers()).toBeDefined();
    });

    it("should be able to create a user: ", async () => {
        const user: User = {
            email: "ok@ok.ok",
            username: "okok",
            password: "ok123",
        };
        const created = await aUser.createUser(user);
        expect(created.username).toEqual("okok");
    });

    it("get User by Name: ", async () => {
        const user: User = {
            email: "ok@ok.ok",
            username: "okok",
            password: "ok123",
        };
        const userByName = await aUser.getUserByName(user.username);
        expect(userByName.email).toEqual(user.email);
    });

    it("Get User by Email: ", async () => {
        const user: User = {
            email: "ok@ok.ok",
            username: "okok",
            password: "ok123"
        }
        const userByEmail = await aUser.getUserByEmail(user.email);
        expect(userByEmail.username).toEqual(user.username);
    })

    it("should be able to update user info: ", async () => {
        const newUser: User = {
            id: "7",
            email: "osm@test.com",
            username: "ali",
            password: "pass123"
        }
        const updatingUSer = await aUser.updateUser(newUser);
        expect(updatingUSer.username).toEqual("ali")
    })

});

// ######################################################################################
// ######################################################################################
//                              TESTING THE Product Model here 
// ######################################################################################
// ######################################################################################

describe("Testing the Product Model: ", () => {
    it("Should have index method: ", () => {
        expect(aProduct.index()).toBeDefined();
    });

    it("Be able to create a new product: ", async () => {
        const product: Product = {
            name: "laptop",
            price: 10000
        };
        const createdProduct = await aProduct.create(product);
        // console.log(createdProduct.price);
        expect(createdProduct.price).toEqual(10000)
    });

    it("Get a product by name: ", async () => {
        const product: Product = {
            name: "laptop",
            price: 10000
        }
        const theProduct = await aProduct.getProductByName(product.name);
        expect(theProduct.price).toEqual(10000)
    });

    it("Update Product Info : ", async () => {
        const newProduct: Product = {
            id: 2,
            name: "Huawei y7p",
            price: 2500
        }
        const updatingProduct = await aProduct.update(newProduct);
        expect(updatingProduct).toEqual(newProduct);
    });

})

// ######################################################################################
// ######################################################################################
//                              TESTING THE Order Model here 
// ######################################################################################
// ######################################################################################

describe("TestIng the Order Model: ", () => {
    it("creates an order: ", async () => {
        const order: Order = {
            status: "active",
            user_id: 2
        }
        const createdOrder = await anOrder.create(order);
        expect(createdOrder.status).toBe('active');
    });

    it("Updates an order: ", async () => {
        const orderUp: Order = {
            id: 3,
            status: "pending",
            user_id: 2
        }
        const updatedOrder = await anOrder.update(orderUp);
        expect(updatedOrder.status).toBe('pending');
    });

    it("deletes an order :", async () => {
        const deleted = await anOrder.delete(5);
        expect(deleted).toBeUndefined()
    })
})