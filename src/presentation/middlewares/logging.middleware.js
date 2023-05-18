module.exports = (err, req, res, next) => {
  try {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? error : {};

    if (err) {
      logger.error(
        `${error.status || 500} - ${error.message} - ${req.originalUrl} - ${
          req.method
        } - ${req.ip}`
      );
      next(err);
    }

    logger.info(
      `${req.status || 500} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    next();
  } catch (err) {
    throw err;
  }
};
