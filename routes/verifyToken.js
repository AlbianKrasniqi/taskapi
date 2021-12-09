const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({
      message: "Acces Denied",
      status: -1,
    });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        message: "Enough time is up",
        status: -1,
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).send({
        message: "Unauthorized or unsigned access",
        status: -1,
      });
    }
  }
};
