const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      res.status(401).json({ message: "Unauthorized Access" });
      next();
    }
    let token = req.headers["authorization"].split(" ")[1];
    let decoded = jwt.verify(token, process.env.KEY);
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized Access" });
      next();
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Access" });
    throw error;
  }
};
