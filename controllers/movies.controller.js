const moviesServices = require('../services/movies.services')

const getAllMovies = async(req, res)=>{
    console.log("getAllMovies Controller");
    try {
        let response = await moviesServices.getAllMovies(req.query);
        if(response.success)
            res.status(200).json({response});
        else
            res.status(500).json({response});

    }
    catch(error)
    {
        res.status(500).json({error})
    }
}

const getMovieDetailsById = async(req, res)=>{
    console.log("getMovieDetailsById")
    try {
        let {id} = req.params;
        let response = await moviesServices.getMovieDetails(id);
        if(response.success)
            res.status(200).json({response});
        else
            res.status(500).json({response});
    }
    catch(error)
    {
        res.status(500).json({error})
    }
}

const deleteMovie = async(req, res)=>{
    console.log("deleteMovie Controller")
    try {
        let {id} = req.params;
        let response = await moviesServices.deleteMovie(id);
        if(response.success)
            res.status(200).json({response});
        else
            res.status(500).json({response});
    }
    catch(error)
    {
        res.status(500).json({error})
    }
}

const updateMovie = async(req, res) =>{
    console.log("UpdateMovie Controller");
    let response = await moviesServices.updateMovie(req.body);
    console.log("Response", response)

    if(response.success)
        res.status(200).json({response});
    else
        res.status(500).json({response});
}

module.exports = {
    getAllMovies,
    getMovieDetailsById,
    deleteMovie,
    updateMovie
}