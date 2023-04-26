// Enviroment
require("dotenv").config();

// Dependency Injection
const container = require("./src/application/dependency/container");
const server = container.resolve("app");

// Database
const { sequelize } = require("./src/infra/database/entities/index");

sequelize
  .authenticate()
  .then(async () => {
    server.logger.info(
      "Connection to database has been established successfully."
    );
    await server.startServers();
  })
  .catch((error) => {
    server.logger.error("Unable to connect to the database:", error);
  });
