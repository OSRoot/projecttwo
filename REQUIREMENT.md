# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index visit GET http://localhost:7000/api/products
- Show  visit GET http://localhost:7000/api/products/:id
- Create [token required] # POST http://localhost:7000/api/products
- [OPTIONAL] Top 5 most popular products GET http://localhost:7000/api/five_expensive
- [OPTIONAL] Products by category (args: product category)

#### Users
- create [token required]   POST http://localhost:7000/api/users
- getuser or users [token required] GET http://localhost:7000/api/users or users/:id
- update [token required]   POST http://localhost:7000/api/users/:id
- delete [token required]   DELETE http://localhost:7000/api/users/:id

#### Orders
- Current Order by user (args: user id)[token required] GET http://localhost:7000/api/orders or orders/:id

## Data Shapes
#### Product
-  id   
- name
- price
- [OPTIONAL] category

#### User
- id
- email
- username
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### products

- id
- name
- price
