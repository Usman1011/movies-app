const {sequelize} = require('../config/database.config');
const Sequelize = require("sequelize");
const movies = sequelize.define('movies', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
    },
    opening_crawl: {
        type: Sequelize.TEXT('medium'),
    },
    director: {
        type: Sequelize.STRING,
    },
    producer: {
        type: Sequelize.STRING,
    },
    episode_id: {
        type: Sequelize.INTEGER,
    },
    release_date: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING
    }
    
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    }
);

module.exports.moviesModel = movies;