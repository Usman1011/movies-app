const { response } = require('express');
const {
    getAllMoviesFromDb,
    insertMoviesInDb,
    getMovieDetailsFromIdDb,
    deleteMovieById,
    updateMovieById
} = require('../database/movies.db');
const axios = require('axios');
const {getAllCharacters, getAllPlanets} = require('../utils/http-utils');

const getAllMovies = async (reqbody) =>{
    console.log("getAllMovies Service");
    let response = {
        success: false
    }
    try {
        // console.log("Query Params: ", reqbody);
        let {title} = reqbody;
        console.log("title: ", title);

        let movies = await getAllMoviesFromDb(title)
        if(!movies.length)
        {
            let res = await axios.get('https://swapi.dev/api/films');
            movies = await insertMoviesInDb(res.data.results);
            // console.log("Movies Inserted In Db: ", movies);

            if(title)
            {
                movies = movies.filter(movie => movie?.title?.toLowerCase() === title.toLowerCase());
                if(movies.length)
                {
                    response.success = true;
                    response.data = movies;
                }
                else
                {
                    response.success = false;
                    response.message = `No Movie For Search '${title}'`;
                }
            }
            else
            {
                response.success = true;
                response.data = movies;
            }
        }
        else
        {
            
            if(title)
            {
                movies = movies.filter(movie => movie?.Title?.toLowerCase() === title.toLowerCase());
                if(movies.length)
                {
                    response.success = true;
                    response.data = movies;    
                }
                else
                {
                    response.success = false;
                    response.message = `No Movie For Search '${title}'`;
                }

            }
            else
            {
                response.success = true;
                response.data = movies;
                
            }
        }
    }
    catch(error)
    {
        response.success = false;
        response.message = error.message;
        console.log("getAllMovies Service, Error: ", error.message);
    }
    return response;
}

const getMovieDetails = async (id) =>{

    let response = {
        success: false
    };

    try {
        console.log("getMovieDetails", id);
        let movie = await getMovieDetailsFromIdDb(id);
        console.log("getMovieDetails", movie);

        if(Object.keys(movie).length) {

            let res = await axios.get(movie.url);

            console.log("MOVIE INFO:" ,res.data);
            let {characters, planets} = res.data;

            characters = await getAllCharacters(res.data.characters);
            planets = await getAllPlanets(res.data.planets)
            movie.characters = characters;
            movie.planets = planets;

            response.success = true;
            response.data = movie;
        }
        else {
            response.success = false;
            response.message = "No Movie Found";
        }
    }
    catch(error) {

        console.log("getMovieDetails Service Error: ", error.message);
        response.success = false;
        response.message = "Internal Server Error";

    }
    return response;
}

const deleteMovie = async (id) =>{

    console.log("deleteMovie Service");
    let response = {
        success: false
    }
    try{
        let moviesDeleted = await deleteMovieById(id);

        if(moviesDeleted)
        {
            response.success = true;
            response.message = "Movie Deleted Successfully";
        }
        else
        {
            response.success = false;
            response.message = "No Movie Found";
        }

    }
    catch(error){
        console.log("deleteMovie Service Error: ", error.message);
        response.success = false;
        response.message = error.message;
    }
    return response;
}

const updateMovie = async (body) =>{

    console.log("updateMovie Service");
    let response = {
        success: false
    }
    try{

        let {id} = body;
        delete body.id;
        let updatedMovie = await updateMovieById(id, body);

        if(updatedMovie)
        {
            response.success = true;
            response.message = "Movie Updated Successfully";
        }
        else
        {
            response.success = false;
            response.message = "No Movie Found";
        }

    }
    catch(error){
        console.log("updatedMovie Service Error: ", error.message);
        response.success = false;
        response.message = error.message;
    }
    return response;
}


module.exports = {
    getAllMovies,
    getMovieDetails,
    deleteMovie,
    updateMovie
};