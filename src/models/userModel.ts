import Client from './../client';
import { User } from '../types/userType';
import * as bcrypt from 'bcrypt';
import config from '../envConfig';


// ########################################################################
// ## 1- createUser (u: User)                                       #######
// ## 2- getUser (id:string)                                        #######
// ## 3- updateUser (id: string)                                    #######
// ## 4- deleteUser (id:string)                                     #######
// ## 5- getUsers ()                                                #######
// ## 6- authenticateUser (username: string, password: string)      #######
// ########################################################################


export class UserClass {

    // ## 1- createUser (u: User)                                       #######
    async createUser(u: User): Promise<User> {
        try {
            // connect to the database
            const _connect = await Client.connect();
            // what sql for creating user (INSERT INTO users ...)
            const _sql = `INSERT INTO users (email, username, password)
                    VALUES
                    ($1, $2, $3) RETURNING id, email, username;`;
            // use hashing password
            const _hash = bcrypt.hashSync(u.password + config.pepper, +(config.salt as string));
            //  pass sql query to the database 
            const _result = await _connect.query(_sql, [u.email, u.username, _hash])
            //release
            _connect.release();
            return _result.rows[0];

        } catch (error) {
            throw new Error(`Couldn't Create user: ${u.username}: ${error}`)
        }
    }

    // ## 2- getUser (id:string)                                        #######
    async getUser(id: string): Promise<User> {
        try {
            const _connect = await Client.connect();
            const _sql = `SELECT id, email, username FROM users WHERE id=($1);`;
            const _result = await _connect.query(_sql, [id]);
            _connect.release();
            return _result.rows[0];

        } catch (error) {
            throw new Error(`Unable to get User: ${error}`)
        }
    }

    // ## 3- updateUser (id: string)                                    #######
    async updateUser(u: User): Promise<User> {
        try {
            const _connect = await Client.connect();
            const _sql = `UPDATE users SET email=$1, username=$2, password=$3 WHERE id=($4)
                        RETURNING id, email, username;`;
            const _hash = bcrypt.hashSync(u.password + config.pepper, +(config.salt as string))
            const _result = await _connect.query(_sql, [u.email, u.username, _hash, u.id]);
            _connect.release();
            return _result.rows[0]

        } catch (error) {
            throw new Error(`Couldn't Update user info: ${error}`)
        }
    }

    // ## 4- deleteUser (id:string)                                     #######
    async deleteUser(id: string): Promise<User> {
        try {
            const _connect = await Client.connect();
            const _sql = `DELETE FROM users WHERE id=($1);`
            const _result = await _connect.query(_sql, [id]);
            _connect.release();
            return _result.rows[0];


        } catch (error) {
            throw new Error(`Unable to delete user: ${error}`)
        }
    }
    // ## 5- getUsers ()                                                #######
    async getUsers(): Promise<User[]> {
        const _connect = await Client.connect();
        const _sql = `SELECT id, email, username FROM users;`;
        const _result = await _connect.query(_sql);
        _connect.release();
        return _result.rows;
    }

    // ## 6- authenticateUser (username: string, password: string)      #######
    async authenticateUser(username: string, password: string): Promise<User | null> {
        try {
            const _connect = await Client.connect();
            const _sql = `SELECT * FROM users WHERE username=($1);`;
            const _result = await _connect.query(_sql, [username]);
            if (_result.rows.length) {
                const user = _result.rows[0];
                if (bcrypt.compareSync(password + config.pepper, user.password)) {
                    return user;
                }
            }
            _connect.release();
            return null;

        } catch (error) {
            throw new Error(`Unable to login user : ${username} : ${error}`)
        }
    }
}

