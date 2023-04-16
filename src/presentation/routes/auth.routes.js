const AuthMiddleware = require("./../middlewares/auth.middleware");

module.exports = ({ AuthService }) => {
  const router = require("express").Router();

  router.post("/register", async (req, res) => {
    try {
      const user = await AuthService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      throw error;
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const token = await AuthService.loginUser(
        req.body.email,
        req.body.password
      );

      if (token === false) {
        res.status(400).json({ error: "Invalid user or password" });
      }
      res.status(200).json({ token });
    } catch (error) {
      throw error;
    }
  });

  router.get("/user", AuthMiddleware, async (req, res) => {
    try {
      const user = await AuthService.getUserInfo(req.user.id);
      if (user === null) {
        res
          .status(404)
          .json({ message: "User not available, or insufficient permissions" });
      }
      res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  });
  return router;
};
