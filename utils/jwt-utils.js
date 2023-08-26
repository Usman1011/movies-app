const jwt = require("jsonwebtoken");
const {secretKey, client_secret} = require('../constants/secrets');

const signJWTToken = (user) => {
  let token = jwt.sign({ user }, secretKey);

  return token;
};


const verifyJWTToken = async (token, req, res) => {
  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return false
    }

    req.user = decoded.user;

    return true;
  });
};

const getAccessToken = () => {

  let obj = {
    clientSecret: client_secret,
    date: new Date()
  }
  let token = jwt.sign(obj, secretKey);
  return token;
};

const verifyAccessToken = (token)=>{

  console.log("verifyAccessToken", token);
  return jwt.verify(token, secretKey, (err, decoded) => {
    
    if (err) {
      return false
    }
    console.log("DECODED: ", decoded);
    if(decoded.clientSecret === client_secret)
      return true;
    else 
      return false
  });
}
module.exports = { signJWTToken, verifyJWTToken, getAccessToken, verifyAccessToken};
