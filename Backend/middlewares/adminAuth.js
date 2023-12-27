const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
