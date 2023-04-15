module.exports = ({ AuthService }) => {
  const router = require("express").Router();

  router.post("/register", (req, res) => {
    try {
      const user = AuthService.registerUser(req.body);
      if (user?.created_At) res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error });
      throw error;
    }
  });

  router.post("/login", (req, res) => {});

  router.post("logout", (req, res) => {
    req.session.destroy(function () {
      res.redirect("/");
    });
  });

  return router;
};
