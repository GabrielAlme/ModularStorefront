import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './backend/api.js';
import errorHandler from './backend/errorHandler.js';
import { createUser, loginUser, getUsers, findUser } from './backend/userQueries.js';

const __dirname = import.meta.dirname; //gets the current directory
const app = express(); //creates the express server
const PORT = process.env.PORT || 3000; //gets the port from heroku if it cant get the port it gets set to 3000

app.use(express.json()); //lets routes read JSON request bodies (req.body)

app.use('/api', api); //all backend routes live under /api, this has to come before the catch-all below

//Post method for the signup page
app.post("/api/SignUp", async (req, res) => {
    const { name, username, email, password } = req.body

    //Server side validation for security
    if(!name || !username || !email || !password) {
        return res.status(400).json({error: "All fields are required" });
    }
    
    try {
        const user = await createUser({ name, username, email, password });
        res.status(201).json(user);
    } catch (error) {
        if (error.message === "Email Already Registered" || error.message === "Username already taken") {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({error: "Something went wrong"});
    }
});

//Post method for the login page
app.post("/api/LoginPage", async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        if (!user) return res.status(401).json({error: "Invalid email or password" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

//Static files, this must stay after all api routes
app.use(express.static(path.join(__dirname, 'dist'))); //creates dist/ and attaches the filepath to it and hands it to the browser to be given to a user when they access the site

//Catch all, stays after everything else
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));// catch all for files that are requested but not necessarily there, so the server doesnt wait for them and still loads
});

//Stays last
app.use(errorHandler); //has to be the last app.use, catches errors from routes

app.listen(PORT, () => console.log(`Listening on ${PORT}`))// tells the app to listen on heroku's port