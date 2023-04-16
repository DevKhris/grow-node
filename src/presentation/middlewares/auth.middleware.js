const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];
    let decoded = jwt.verify(token, process.env.APP_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Access" });
    throw error;
  }
};
