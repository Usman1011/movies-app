const express = require("express");
const router = express.Router();
const {authenticationContoller} = require('../controllers/index.controller');
const {verifyAccessTokenMiddleware} = require('../middlewares/authorization');

router.post('/',verifyAccessTokenMiddleware, authenticationContoller.userAuthentication);
router.post('/signup', verifyAccessTokenMiddleware, authenticationContoller.userRegister);
router.get('/token', authenticationContoller.getAccessTokenContoller);


module.exports = router;