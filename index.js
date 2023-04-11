require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const session = require("express-session");
const privateKey = fs.readFileSync("./certificates/key.pem", "utf-8");
const cert = fs.readFileSync("./certificates/cert.pem", "utf-8");
const { sequelize } = require("./src/infra/database/entities/index");

const auth = require("./src/routes/auth");

// Configuration
const app = express();

const port = process.env.APP_PORT | 8080;
const securePort = process.env.APP_SECUREPORT | 8443;
const credentials = {
  key: privateKey,
  cert: cert,
  passphrase: process.env.APP_CERT_KEY,
};

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// Middlewares
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.APP_KEY,
  })
);

app.use((req, res, next) => {
  let error = req.session.error;
  let message = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (error) res.locals.message = '<p class="alert error">' + error + "</p>";
  if (message)
    res.locals.message = '<p class="alert success">' + message + "</p>";
  next();
});

// Routes
app.get("/", (req, res) => {
  res.header("Content-type", "application/json");
  res.send({
    message: "Bienvenido al Grow de Node",
    status: "200",
  });
});

app.use("/auth", auth);

// Server
let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

httpsServer.listen(securePort, () => {
  console.log(`Server running at https://localhost:${securePort}`);
});
