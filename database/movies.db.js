const {moviesModel} = require('../models/movies');

const getAllMoviesFromDb = async ()=>{

    console.log("getAllMoviesFromDb: ")
    try {
        let moviesFromDb = 
        await moviesModel.findAll({
             attributes:['id', ['title', "Title"], ['director', 'Directed By'], ['release_date', 'Release Date']],
        })
        ;
        if(moviesFromDb.length)
            moviesFromDb = moviesFromDb.map((movie)=>{
                return movie.dataValues;
        })
        console.log("Movies From Db: ", moviesFromDb)
        return moviesFromDb.length ? moviesFromDb : [];
    }    
    catch(error) {
        console.log("getAllMoviesFromDb Error: ", error.message);
    }
}

const getMovieDetailsFromIdDb = async (id)=>{
    try {
        let moviesDetails = await moviesModel.findOne({
            where: {id}
        });
        console.log("MOVIES:", moviesDetails);

        return moviesDetails?.dataValues || {};
    }    
    catch(error) {
        console.log("getAllMoviesFromDb Error: ", error.message);
    }
}

const insertMoviesInDb = async(movies)=>{
    try {

        let moviesData = movies.map((movie,index=1)=>{
            let {title, opening_crawl, director, producer, episode_id, release_date,url} = movie;
            
            return {
                id: index + 1,
                title,
                opening_crawl,
                director,
                producer,
                episode_id,
                release_date,
                url
            }
        });
        console.log("MoviesData Inserted In DB: ", moviesData);
        await moviesModel.bulkCreate(moviesData);
        return moviesData;
    }
    catch(error){
        console.log("Error in insertMoviesInDb: ", error.message);
        throw error;
    }
}

const deleteMovieById = async (id)=>{
    let moviesDeleted = await moviesModel.destroy({
        where: {id}
    })
    console.log("moviesDeleted: ", moviesDeleted);
    return moviesDeleted
    
}

const updateMovieById = async (id, updatedBodyObject)=>{
    try{
        console.log("updateMovieById: ", updatedBodyObject, "Id:", id);
        let movieUpdated = await moviesModel.update(
        updatedBodyObject,
        {where: {id}}
    )
        console.log("MovieUpdated: ", movieUpdated);
        return movieUpdated[0];
    }
    catch(error)
    {
        console.log("Error in updateMovieById: ", error.message);
        throw error
    }
    
}

module.exports = {
    getAllMoviesFromDb,
    getMovieDetailsFromIdDb,
    insertMoviesInDb,
    deleteMovieById,
    updateMovieById
};