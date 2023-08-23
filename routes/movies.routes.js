const express = require("express");
const router = express.Router();

router.post('/', (req,res)=>{
    console.log("Movies ROute");
    res.send("Success");
})

module.exports = router;