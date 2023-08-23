const AuthenticationServices = require('../services/authentication.services');

const userAuthentication = async (req, res) =>{

    let response = await AuthenticationServices.userAuthentication(req, res, req.body);
    console.log("userAuthentication Controller:" , response);
    if(response.success)
        res.status(200).json({response});

    res.status(500).json({response});

}

module.exports = {
    userAuthentication
}