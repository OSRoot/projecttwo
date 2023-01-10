# projecttwo
storefront endpoint api
# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

###### How to setup and connect to database
- 
-  create a database in postgresql using either terminal or pgAdmin
-  the database of this project is called (storefron_dev without t)
-  the port of the back end and database is => 7000 
-  you will need some packages to get the server and database connected and work together smoothly
-  There are some scripts commands in package.json in the project directory, have a look there
-   => yarn dev // this starts nodemon inside the project
-   => yarn format // uses prettier to format the code
-   => yarn lint // uses eslint
-  ###### => yarn start // start the server and work
### List of packages werer mentioned above (Required Technologies)

###### Models 
- products
- orders
- order_products
- users
- There is an endpoint for each and a test as well

###### Express handler / controller (I user controller keyword instead of handler)
- fixing the incoming request to specific routes to the correct model method

##### JWTs 
- using jsonwebtoken to strict some resources from unauthorized users, using token validation as middleware

###### Testing 
- this project is provided with some tests on what follows:
-   * the apis can be reached for specific actions
-   * models are tested on spcific actions depending on the tokens


#### the endpints with verbs
//1- GET http://localhost/api/orders (token required)
//2- POST http://localhost/api/orders   (token required)
//3- GET http://localhost/api/orders/orders/:id (token required)
//4- PATCH http://localhost/api/orders/orders/:id   (token required)
//5- DELETE http://localhost/api/orders/orders/:id  (token required)
//6- GET http://localhost/api/products_in_order (token required)
//7- GET http://localhost/api/five_expensive
//8- POST http://localhost/api/products_in_order    (token required)
//9- GET http://localhost/api/users     (token required)
//10- POST http://localhost/api/users   
//11- GET http://localhost/api/users/:id
//12- PATCH http://localhost/api/users/:id  (token required)
//13- DELETE http://localhost/api/users/:id (token required)
//14- POST http://localhost/api/login   
//15- GET http://localhost/api/products 
//16- POST http://localhost/api/products    (token required)
//17- PATCH http://localhost/api/products/:id   (token required)
//18- DELETE http://localhost/api/products/:id  (token required)
//19- GET http://localhost/api/products/:id
//20- GET http://localhost/api/five_expensive


