// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = 4000;

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

app.get("/movies", async function(request, response) {
    // db.movies.find({});

    const movies = await client
        .db("b41wd")
        .collection("movies")
        .find({})
        .toArray();
    console.log(movies);
    response.send(movies); //JS object -> JSON
});

app.post("/movies", async function(request, response) {
    const data = request.body;
    console.log(data);
    const result = await client.db("b41wd").collection("movies").insertMany(data);

    response.send(result); //JS object -> JSON
});

app.get("/movies/:id", async function(request, response) {
    // console.log(request.params);
    const { id } = request.params;
    console.log(id);

    //db.movies.findOne({id: '101'});
    // gatting the data form mongodb
    const movie = await client
        .db("b41wd")
        .collection("movies")
        .findOne({ id: id });

    // const movie = movies.find((mv) => mv.id === id);
    movie
        ?
        response.send(movie) :
        response.status(404).send({ massage: "Movie not found" }); //JS object -> JSON
});

app.delete("/movies/:id", async function(request, response) {
    // console.log(request.params);
    const { id } = request.params;
    console.log(id);

    //db.movies.deleteOne({id: '101'});
    // gatting the data form mongodb
    const result = await client
        .db("b41wd")
        .collection("movies")
        .deleteOne({ id: id });

    result.deletedCount > 0 ?
        response.send({ massage: "Movie was deleted successfully" }) :
        response.status(404).send({ massage: "Movie not found" }); //JS object -> JSON
});


app.put("/movies/:id", async function(request, response) {
    // console.log(request.params);
    const { id } = request.params;
    const data = request.body;
    console.log(id);

    // db.movies.updateOne({id : id}, {$set: data})
    // gatting the data form mongodb
    const result = await client
        .db("b41wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });

    response.send(result);
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));