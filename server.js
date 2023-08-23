const express = require('express');
const port = 4001;
const app = express();
const {applyAppRoutes} = require('./routes/index.routes');
const db = require('./config/database.config');

db.sequelize.sync({})
.then((res)=>{
    
    console.log("Database Successfully Connected");
    app.use(express.json());

    app.listen(port, ()=>{
        applyAppRoutes(app)
        console.log("Application Running on port:", port);
        
    })
})
.catch((error)=>{
    console.log("Error: ", error.message);
})
