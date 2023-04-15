const express = require("express");
const cors = require("cors");

module.exports = ({ AuthRoutes }) => {
  const router = require("express").Router();
  // Middlewares
  router
    .use(
      express.urlencoded({
        extended: false,
      })
    )
    .use(express.json())
    .use(cors())
    .use(
      express.urlencoded({
        extended: false,
      })
    );

  // Routes
  router.get("/", (req, res) => {
    res.header("Content-type", "application/json");
    res.send({
      message: "Bienvenido al Grow de Node",
      status: "200",
    });
  });

  router.use("/api/v1/auth", AuthRoutes);

  return router;
};
