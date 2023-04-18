const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "verbose",
  format: format.json(),
  defaultMeta: { service: "api-service" },
  transports: [
    new transports.File({ filename: "./logs/error.log", level: "error" }),
    new transports.File({ filename: "./logs/application.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = logger;
