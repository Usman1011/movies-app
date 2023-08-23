const Sequelize = require("sequelize");
const CryptoJS = require("crypto-js");

const sequelize = new Sequelize(
  'movies-DB',
  'sa',
  '123',
  {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      requestTimeout: 300000 },
  },
  port: 1433,
  logging: false,
  }
);




const db = {};
//sequelize instance to access and create db tables
db.sequelize = sequelize;

//sequelize Object to get sequelize functions
db.Sequelize = Sequelize;

module.exports = db;
