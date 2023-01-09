import dotenv from 'dotenv';
dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    SALT_ROUNDS,
    BCRYPT_PASSWORD,
    SERVER_PORT,
    TOKEN_SECRET,

} = process.env

export default {
    host: POSTGRES_HOST,
    database: ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    salt: SALT_ROUNDS,
    pepper: BCRYPT_PASSWORD,
    secret_token: TOKEN_SECRET,
    server_port: SERVER_PORT
}