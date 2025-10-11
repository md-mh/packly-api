const { verifyToken } = require("./JWThelper");

const checkUser = () => (req, res, next) => {
  if (
    req &&
    req.headers.authorization &&
    req.headers.authorization !== "Bearer null" &&
    req.headers.authorization !== "undefined" &&
    req.headers.authorization !== "Bearer undefined" &&
    req.headers.authorization !== "undefined Bearer"
  ) {
    const token = req.headers.authorization;
    const verifyUser = verifyToken(token);
    req.user = verifyUser;
    next();
  } else {
    req.user = null;
    next();
  }
};

module.exports = { checkUser };
