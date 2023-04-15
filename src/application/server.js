const http = require("http");
const https = require("https");
const express = require("express");
const fs = require("fs");

class Server {
  constructor({ router }) {
    this.app = express();
    this.port = process.env.APP_PORT | 8080;
    this.securePort = process.env.APP_SECUREPORT | 8443;
    this.privateKey = fs.readFileSync(
      __dirname + "./../../certificates/key.pem",
      "utf-8"
    );
    this.cert = fs.readFileSync(
      __dirname + "./../../certificates/cert.pem",
      "utf-8"
    );
    this.credentials = {
      key: this.privateKey,
      cert: this.cert,
      passphrase: process.env.APP_CERT_KEY,
    };
    this.httpServer = http.createServer(this.app);
    this.httpsServer = https.createServer(this.credentials, this.app);

    this.app.use(router);
  }

  startServers() {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(this.port, () => {
        console.log(`Server running at http://localhost:${this.port}`);
      });

      this.httpsServer.listen(this.securePort, () => {
        console.log(`Server running at https://localhost:${this.securePort}`);
      });
    });
  }
}

module.exports = Server;
