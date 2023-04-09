const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const session = require("express-session");
const dotenv = require("dotenv");
const privateKey = fs.readFileSync("certificates/key.pem", "utf-8");
const cert = fs.readFileSync("certificates/cert.pem", "utf-8");

dotenv.config();

const credentials = {
  key: privateKey,
  cert: cert,
  passphrase: process.env.APP_CERT_KEY,
};

// Configuration

const app = express();
const port = process.env.APP_PORT | 8080;
const securePort = process.env.APP_SECUREPORT | 8443;

// Static Files
app.set("static", express.static(path.join(__dirname, "public")));

// Views and View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

// Server
let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});

httpsServer.listen(securePort, () => {
  console.log(`Server running at localhost:${securePort}`);
});

// Routes
app.get("/", (req, res) => {
  //   let template = fs.readFileSync("public/index.html");
  //   res.header("Content-type", "text/html");
  //   return res.send(template);
  res.render("welcome");
});
