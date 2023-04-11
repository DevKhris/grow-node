const router = require("express").Router();

router.post("/login", (req, res) => {});

router.post("/register", (req, res) => {});

router.post("logout", (req, res) => {
  req.session.destroy(function () {
    res.redirect("/");
  });
});

module.exports = router;
