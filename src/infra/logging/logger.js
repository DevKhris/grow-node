const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "verbose",
  format: format.json(),
  defaultMeta: { service: "api-service" },
  transports: [
    new transports.File({ filename: "./logs/application.log" }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
      timestamp: new Date(),
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
  exceptionHandlers: [
    new transports.File({
      filename: "./logs/exceptions.log",
      level: "error",
      timestamp: new Date(),
      handleExceptions: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),

    new transports.Console({
      format: format.simple(),
      handleExceptions: true,
      level: "error",
    })
  );
}

module.exports = logger;
