module.exports = ({ AuthService, AuthMiddleware }) => {
  const router = require("express").Router();

  router.post("/register", async (req, res) => {
    try {
      return await AuthService.registerUser(req.body)
        .then((result) => {
          if (!result)
            return res.status(500).json({
              message: "Can't register this customer or already exist",
            });
          return res.status(201).json(result);
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Can't register this customer or already exist",
            code: err.parent.code,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.post("/login", async (req, res) => {
    try {
      return await AuthService.loginUser(req.body.email, req.body.password)
        .then((result) => {
          if (!result) {
            return res
              .status(401)
              .json({ message: "Invalid credentials or password" });
          }
          return res.status(200).json({ token: result });
        })
        .catch((err) => {
          return res.status(500).json({
            message: err.message,
            code: err.parent.code,
          });
        });
    } catch (error) {
      throw error;
    }
  });

  router.get("/user", AuthMiddleware, async (req, res) => {
    try {
      return await AuthService.getUserInfo(req.user.id)
        .then((result) => {
          if (!result) {
            return res.status(401).json({
              message: "User not available, or insufficient permissions",
            });
          }
          res.status(200).json(result);
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({
            message: err.message,
            code: err.code,
          });
        });
    } catch (error) {
      throw error;
    }
  });
  return router;
};
