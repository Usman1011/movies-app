const jwt = require("jsonwebtoken");

const signJWTToken = (user) => {
  let token = jwt.sign({ user }, "qwerty");

  return token;
};

const verifyJWTToken = async (token, req, res) => {
  return jwt.verify(token, "qwerty", (err, decoded) => {
    if (err) {
      return false
    }

    req.user = decoded.user;

    return true;
  });
};

module.exports = { signJWTToken, verifyJWTToken };
