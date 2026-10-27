import pool from './db.js'
import bcrypt from "bcrypt";

//Salt for bcrypt, number of encryption rounds
const SALT = 10;

//returns all users
const getUsers = async () => {
    try {
        const { rows } = await pool.query(
            "SELECT user_id, name, username, email FROM users"
        );
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

//Creates a new user and inserts them into the users table
const createUser = async ({ name, username, email, password }) => {
    try {
        //gets rid of any whitespace on the email before inserting
        email = email.toLowerCase().trim();
        const hash = await bcrypt.hash(password, SALT);
        const { rows } = await pool.query(
            "INSERT INTO users (name, username, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING user_id, name, username, email",
            [name, username, email, hash]
        );
        return rows[0];
    } catch (error) {
        //23505 is the error code for a unique constraint violation
        //If an email or username is already in the database, it will throw error 23505 with email or username in error.constraint
        if (error.code === "23505") {  
            if(error.constraint === "users_email_unique") { 
                throw new Error("Email Already Registered");
            }
            if(error.constraint === "users_username_constraint") {
                throw new Error("Username already taken");
            }
        }
        console.error(error);
        throw new Error("Registration error");
    }
};

//logs the user in and returns a const with the users information (minus the password) if they are successfully logged in
const loginUser = async (email, plainPass) => {
    try {
        email = email.toLowerCase().trim();
        const { rows } = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        //detects if the email is registered or not
        if (rows.length === 0){
            console.log("User Not Found");
            return null;
        }

        //Storing everything but the password in the const user
        const { password_hash: storedPass, ...user} = rows[0];
        //Detecting if the password given is correct
        const match = await bcrypt.compare(plainPass, storedPass);

        if(match) {
            console.log("Login successful!");
            return user;
        } else {
            console.log("Invalid Password");
            return null;
        }
    } catch(error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

//finds a user by their id
const findUser = async (id) => {
    try {
        const { rows } = await pool.query(
            "SELECT user_id, name, username, email FROM users WHERE user_id = $1",
            [id]
        );
        return rows[0] || null;
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

export { getUsers, createUser, findUser, loginUser };