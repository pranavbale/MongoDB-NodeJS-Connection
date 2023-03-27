// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import moviesRouter from './routes/movies.route.js';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = process.env.PORT;

// connect mongodb to node.js
// const MONGO_URL = "mongodb://127.0.0.1:27017"; // mongodb port noumber 27017
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected !!!");
// middleware -express.json()- (inbuilt middleware);
app.use(express.json());

app.get("/", function(request, response) {
    response.send("Hii 🙋‍♂️, 🌏 🎊✨🤩");
});

app.use('/movies', moviesRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };