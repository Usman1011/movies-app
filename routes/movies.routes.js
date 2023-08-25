const express = require("express");
const router = express.Router();
const moviesController = require('../controllers/movies.controller');

router.get('/', moviesController.getAllMovies);
router.get('/:id',  moviesController.getMovieDetailsById);
router.delete('/:id',  moviesController.deleteMovie);
router.put('/',  moviesController.updateMovie);



module.exports = router;