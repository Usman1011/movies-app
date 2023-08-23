const { response } = require('express');
const {users} = require('../models/user');
const {signJWTToken} = require('../utils/jwt-utils');

const userAuthentication = async (req, res, reqBody) =>{
    let response = {
        success: false
    };
    console.log("userAuthentication Service: ", reqBody);
    try{
        let {userName, password} = reqBody;
    let DbResult = await users.findOne({
        where: {
            userName
        }
    })
    console.log("DB Result: ", DbResult);

    let user = DbResult?.dataValues;
    if(user)
    {
        if(user.password === password)
        {
            console.log("User Successfully Authenticated");
            let token = signJWTToken(user);
            if(token)
            {
                user.token = token;
            }
            response.user = user;
            response.success = true;
            response.message = "User Successfully Authenticated"

        }
        else {
            response.success = false;
            response.message = "Invalid Credentials"
        }

    }
    else
    {
        response.success = false;
        response.message = "User Does not exist";
    }
    console.log("userAuthentication Service End: ", response);
    }
    catch(error) {
        console.log("Error At Authentication Service:", error);
        response.success = false;
        response.message = "Internal Server Error";
    }
    return response;
}

const AuthenticationServices = {
    userAuthentication,
  };
  
  module.exports = AuthenticationServices;
  