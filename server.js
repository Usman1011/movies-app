const express = require('express');
const port = 4001;
const app = express();
const {applyAppRoutes} = require('./routes/index.routes');
const db = require('./config/database.config');

console.log("Waiting for Database Connectivity")
setTimeout(()=>{
    db.sequelize.sync()
    .then((res)=>{
        
        console.log("Database Successfully Connected");
        app.use(express.json());

        app.listen(port, ()=>{
            applyAppRoutes(app)
            console.log("Application Running on port:", port);
            
        })
    })
    .catch((error)=>{
        console.log("Error Connecting To Database: ", error.message);
    })
}, 15000);
