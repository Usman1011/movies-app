const {sequelize} = require('../config/database.config');
const Sequelize = require("sequelize");
const users = sequelize.define('users', {
    userName: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
    },
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    }
);

module.exports.users = users;