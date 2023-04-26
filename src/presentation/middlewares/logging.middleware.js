module.exports = (error, req, res, next, { logger }) => {
  try {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? error : {};
    console.log(req.pap.get("env"));
    logger.error(
      `${error.status || 500} - ${error.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    next();
  } catch (err) {
    logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }
};
