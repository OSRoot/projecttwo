import Client from "./../client";
import { User } from "../types/userType";
import * as bcrypt from "bcrypt";
import config from "../envConfig";
import dotenv from "dotenv";
dotenv.config();

const _hashing = (password: string) => {
  return bcrypt.hashSync(
    `${password} + ${config.pepper as string}`,
    +(config.salt as string, 10)
  );
};

// ########################################################################
// ## 1- createUser (u: User)                                       #######
// ## 2- getUserById (id:string)                                    #######
// ## 3- getUserByName (username?:string)                           #######
// ## 4- getUserByEmail (email)                                     #######
// ## 5- updateUser (id: string)                                    #######
// ## 6- deleteUser (id:string)                                     #######
// ## 7- getUsers ()                                                #######
// ## 8- authenticateUser (username: string, password: string)      #######
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
      const _hash = _hashing(u.password);
      //  pass sql query to the database
      const _result = await _connect.query(_sql, [u.email, u.username, _hash]);
      //release
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't Create user: ${u.username}: ${error}`);
    }
  }

  // ########################################################################
  // ########################################################################
  // ########################################################################

  // ## 2- getUserById (id:string)                                        #######
  async getUserById(id: string): Promise<User> {
    try {
      const _connect = await Client.connect();
      const _sql = `SELECT id, email, username FROM users WHERE id=($1);`;
      const _result = await _connect.query(_sql, [id]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to get User: Enter User ID:🤔 ${error} 🤔:Enter Correct User ID:🤔`
      );
    }
  }

  // ########################################################################
  // ########################################################################
  // ########################################################################

  // ## 3- getUserByName (username:string)                                        #######
  async getUserByName(username: string): Promise<User> {
    try {
      const _connect = await Client.connect();
      const _sql = `SELECT id, email, username FROM users WHERE username=($1);`;
      const _result = await _connect.query(_sql, [username]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to get User:  ${error} 🤔:Enter User username:🤔`
      );
    }
  }

  // ########################################################################
  // ########################################################################
  // ########################################################################

  // ## 4- getUserByEmail (email)                                     #######                                      #######
  async getUserByEmail(email: string): Promise<User> {
    try {
      const _connect = await Client.connect();
      const _sql = `SELECT id, email, username FROM users WHERE email=($1);`;
      const _result = await _connect.query(_sql, [email]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to get User:  ${error} 🤔:Enter User username:🤔`
      );
    }
  }

  // ########################################################################
  // ########################################################################
  // ########################################################################

  // ## 4- updateUser (id: string)                                    #######
  async updateUser(u: User): Promise<User> {
    try {
      const _connect = await Client.connect();
      const _sql = `UPDATE users SET email=$1, username=$2, password=$3 WHERE id=($4)
                        RETURNING id, email, username;`;
      const _hash = _hashing(u.password);
      const _result = await _connect.query(_sql, [
        u.email,
        u.username,
        _hash,
        u.id,
      ]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't Update user info: ${error}`);
    }
  }

  // ########################################################################
  // ########################################################################
  // ########################################################################

  // ## 5- deleteUser (id:string)                                     #######
  async deleteUser(id: string): Promise<User> {
    try {
      const _connect = await Client.connect();
      const _sql = `DELETE FROM users WHERE id=($1);`;
      const _result = await _connect.query(_sql, [id]);
      _connect.release();
      return _result.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete user: ${error}`);
    }
  }

  // ########################################################################
  // ########################################################################
  // ########################################################################

  // ## 6- getUsers ()                                                #######
  async getUsers(): Promise<User[]> {
    const _connect = await Client.connect();
    const _sql = `SELECT id, email, username FROM users;`;
    const _result = await _connect.query(_sql);
    _connect.release();
    return _result.rows;
  }

  // ########################################################################
  // ########################################################################
  // ########################################################################

  // ## 7- authenticateUser (username: string, password: string)      #######
  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const _connect = await Client.connect();
      const _sql = `SELECT password FROM users WHERE email=($1);`;
      const _result = await _connect.query(_sql, [email]);
      if (_result.rows.length) {
        const { password: _hashing } = _result.rows[0];
        const isPassword = bcrypt.compareSync(
          `${password}${config.pepper}`,
          _hashing
        );
        if (isPassword) {
          const uInfo = await _connect.query(
            "SELECT id, email, username from users WHERE email=($1)",
            [email]
          );
          return uInfo.rows[0];
        }
      }
      _connect.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login user : ${email} : ${error}`);
    }
  }
}
