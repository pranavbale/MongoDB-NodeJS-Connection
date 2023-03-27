import express from 'express';
import { getAllMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } from '../services/movies.service.js';
const router = express.Router();


router.get("/", async function(request, response) {
    // db.movies.find({});

    const movies = await getAllMovies();
    response.send(movies); //JS object -> JSON
});

router.post("/", async function(request, response) {
    const data = request.body;
    console.log(data);
    const result = await createMovies(data);

    response.send(result); //JS object -> JSON
});

router.get("/:id", async function(request, response) {
    // console.log(request.params);
    const { id } = request.params;
    console.log(id);

    //db.movies.findOne({id: '101'});
    // gatting the data form mongodb
    const movie = await getMovieById(id);

    // const movie = movies.find((mv) => mv.id === id);
    movie
        ?
        response.send(movie) :
        response.status(404).send({ massage: "Movie not found" }); //JS object -> JSON
});

router.delete("/:id", async function(request, response) {
    // console.log(request.params);
    const { id } = request.params;
    console.log(id);

    //db.movies.deleteOne({id: '101'});
    // gatting the data form mongodb
    const result = await deleteMovieById(id);

    result.deletedCount > 0 ?
        response.send({ massage: "Movie was deleted successfully" }) :
        response.status(404).send({ massage: "Movie not found" }); //JS object -> JSON
});


router.put("/:id", async function(request, response) {
    // console.log(request.params);
    const { id } = request.params;
    const data = request.body;
    console.log(id);

    // db.movies.updateOne({id : id}, {$set: data})
    // gatting the data form mongodb
    const result = await updateMovieById(id, data);

    response.send(result);
});

export default router;