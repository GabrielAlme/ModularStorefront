const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "storefront",
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});

const SALT = 10;

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

const createUser = async ({ name, username, email, password }) => {
    try {
        email = email.toLowerCase().trim();
        const hash = await bcrypt.hash(password, SALT);
        email = email.toLowerCase().trim();
        const { rows } = await pool.query(
            "INSERT INTO users (name, username, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING user_id, name, username, email",
            [name, username, email, hash]
        );
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Registration error");
    }
};

const loginUser = async (email, plainPass) => {
    try {
        email = email.toLowerCase().trim();
        const { rows } = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (rows.length === 0){
            console.log("User Not Found");
            return null;
        }

        const { password_hash: storedPass, ...user} = rows[0];
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

const findEmail = async (email) => {
    try {
        const { rows } = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)",
            [email]
        );
        return rows[0].exists;
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
};

module.exports = { getUsers, createUser, findUser, findEmail, loginUser };