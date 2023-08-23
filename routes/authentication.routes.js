const express = require("express");
const router = express.Router();
const {authenticationContoller} = require('../controllers/index.controller');

router.post('/', authenticationContoller.userAuthentication);

module.exports = router;