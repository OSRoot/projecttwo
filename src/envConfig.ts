import dotenv from 'dotenv';
dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    PEPPER,
    SALT_ROUNDS,
    BCRYPT_PASSWORD,
    SECRET_TOKEN,
    SERVER_PORT,

}= process.env

export default {
    host: POSTGRES_HOST,
    database: ENV === "dev"? POSTGRES_DB:POSTGRES_DB_TEST,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    pepper: PEPPER,
    salt: SALT_ROUNDS,
    bcrypt_password:BCRYPT_PASSWORD,
    secret_token: SECRET_TOKEN,
    server_port:SERVER_PORT
}