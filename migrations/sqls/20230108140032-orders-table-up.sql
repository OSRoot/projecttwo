CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity integer,
    status VARCHAR(50),
    user_id bigint REFERENCES users(id)
);