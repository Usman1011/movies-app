const {verifyJWTToken} = require('../utils/jwt-utils');

const verifyToken = async (req, res, next) => {
    if (req.headers["authorization"]) {
      let token = req.headers["authorization"].split(" ")[1];
      if (!token) {
        console.error("no token provided!");
        res.status(401).json({
            "Error":"Unauthorized"
        })
      }
      const verified = await verifyJWTToken(token, req, res);
  
  
      if (verified) next();
      else res.status(401).json({
        "Error":"Unauthorized, Invalid Token"
    })

    } else {
        console.error("no authorization header provided!");

      res.status(401).json({
        "Error":"Unauthorized"
    })
    }
  };

module.exports.verifyToken = verifyToken;