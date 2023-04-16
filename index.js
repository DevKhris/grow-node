// Enviroment
require("dotenv").config();

// Dependency Injection
const container = require("./src/application/dependency/container");
const server = container.resolve("app");

// Database
const { sequelize } = require("./src/infra/database/entities/index");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    server.startServers();
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
