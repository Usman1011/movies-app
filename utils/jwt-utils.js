const jwt = require("jsonwebtoken");

const signJWTToken = (user) => {
  let token = jwt.sign({ user }, "qwerty");

  return token;
};

const verifyJWTToken = async (token, req, res) => {
  return jwt.verify(token, "qwerty", (err, decoded) => {
    if (err) {
      return ResponseUtils.sendError(res, req, {}, "Unauthorized!", 401);
    }

    req.user = decoded.user;

    return true;
  });
};

module.exports = { signJWTToken, verifyJWTToken };
