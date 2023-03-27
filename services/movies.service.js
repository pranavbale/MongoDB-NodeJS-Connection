import { client } from "../index.js";

export async function updateMovieById(id, data) {
    return await client
        .db("b41wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client
        .db("b41wd")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function getAllMovies() {

    return await client
        .db("b41wd")
        .collection("movies")
        .find({})
        .toArray();
}
export async function getMovieById(id) {
    return await client
        .db("b41wd")
        .collection("movies")
        .findOne({ id: id });
}
export async function createMovies(data) {
    return await client
        .db("b41wd")
        .collection("movies")
        .insertMany(data);
}
