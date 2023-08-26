const AuthenticationServices = require('../services/authentication.services');
const {getAccessToken} = require('../utils/jwt-utils')
const userAuthentication = async (req, res) =>{

    let response = await AuthenticationServices.userAuthentication(req, res, req.body);
    console.log("userAuthentication Controller:" , response);
    if(response.success)
        res.status(200).json({response});
    else
    res.status(500).json({response});

}

const userRegister = async (req, res) =>{

    console.log("userAuthentication Controller:");
    reqBody = req.body;
    try {
        if(!reqBody.userName)
            throw new Error('UserName Not Provided')
        if(!reqBody.password)
            throw new Error('Password Not Provided')

        let response = await AuthenticationServices.userRegister(req, res, req.body);
        if(response.success)
            res.status(200).json({response});
        else
        res.status(500).json({response});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }

}
const getAccessTokenContoller = async (req, res)=>{
    let accessToken =  getAccessToken();
    res.status(200).json({token: accessToken})
}
module.exports = {
    userAuthentication,
    userRegister,
    getAccessTokenContoller
}