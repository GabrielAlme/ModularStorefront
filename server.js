import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = import.meta.dirname; //gets the current directory
const app = express(); //creates the express server
const PORT = process.env.PORT || 3000; //gets the port from heroku if it cant get the port it gets set to 3000

app.use(express.static(path.join(__dirname, 'dist'))); //creates dist/ and attaches the filepath to it and hands it to the browser to be given to a user when they access the site

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));// catch all for files that are requested but not neccisarilly there, so the server doesnt wait for them and still loads
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))// tells the app to listen on heroku's port