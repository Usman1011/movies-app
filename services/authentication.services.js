const { response } = require('express');
const {users} = require('../models/user');
const {signJWTToken, getAccessToken} = require('../utils/jwt-utils');
const {getUserByUserName} = require('../database/users.db');

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
                response.token = token;
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

const userRegister = async (req, res, reqBody) => {
    let response = {
        success: false
    }
    console.log("userAuthentication userRegister:");
    try {
        let user = {
            userName: reqBody?.userName, 
            password: reqBody?.password
        };

        let userRegistered =  await userExists(user.userName);
        if(!userRegistered)
        {
            await users.create(user);

            response.success = true;
            response.message = "User Successfully Registered"
        }
        else
        {
            response.success = false;
            response.message = "A User With This Username Already Exists"
        }

    }
    catch(error)
    {
        console.log("Error Creating User: ", error.message);
        response.success = false;
        response.message = "Internal Server Error"
        throw error;
    }
    return response
}

const userExists = async (userName) => {
    console.log("USERNAME: ", userName);
    let existingUser = await getUserByUserName(userName);
    console.log("EXISTING: ", existingUser);
    return existingUser ? true : false
}


const AuthenticationServices = {
    userAuthentication,
    userRegister
  };
  
  module.exports = AuthenticationServices;
  