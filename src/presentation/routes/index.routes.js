const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

module.exports = ({
  AuthRoutes,
  PostRoutes,
  CommentRoutes,
  LoggingMiddleware,
}) => {
  const router = express.Router();

  // Middlewares
  router
    .use(
      express.urlencoded({
        extended: false,
      })
    )
    .use(express.json())
    .use(cors())
    .use(helmet());

  router.use(LoggingMiddleware);

  // Routes
  router.get("/", (req, res) => {
    res.status(200).json({
      message: "Bienvenido al Grow de Node",
      status: "200",
    });
  });

  router.use("/api/v1/auth", AuthRoutes);

  router.use("/api/v1", PostRoutes);

  router.use("/api/v1", CommentRoutes);
  return router;
};
