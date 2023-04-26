const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "verbose",
  format: format.json(),
  defaultMeta: { service: "api-service" },
  transports: [
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
      handleExceptions: true,
      json: true,
      colorize: true,
    }),
    new transports.File({ filename: "./logs/application.log" }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

logger.stream = {
  write: function (message, encoding) {
    logger.setEncoding(encoding);
    logger.info(message);
  },
};

module.exports = logger;
