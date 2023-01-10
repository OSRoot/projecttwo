import { Pool } from "pg";
import config from './envConfig';
import dotenv from 'dotenv';
dotenv.config();

const database_config = {
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
}

const Client = new Pool(database_config);

export default Client;