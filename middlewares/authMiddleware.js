const jwt = require("jsonwebtoken");
const authValidation = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const user = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = user;
    req.token = authorization;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = { authValidation };
