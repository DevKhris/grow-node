const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

module.exports = ({ AuthRoutes, PostRoutes }) => {
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
    .use(helmet())
    .use(
      express.urlencoded({
        extended: false,
      })
    );

  // Routes
  router.get("/", (req, res) => {
    res.status(200).json({
      message: "Bienvenido al Grow de Node",
      status: "200",
    });
  });

  router.use("/api/v1/auth", AuthRoutes);

  router.use("/api/v1", PostRoutes);
  return router;
};
