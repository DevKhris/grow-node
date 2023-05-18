const http = require("http");
const https = require("https");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const os = require("os");
class Server {
  constructor({ router, logger }) {
    this.app = express();
    this.hostname = process.env.HOSTNAME || os.hostname().hostname;
    this.port = process.env.PORT || 8080;
    this.securePort = process.env.SECUREPORT || 8443;
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
      passphrase: process.env.CERT_KEY,
    };
    this.httpServer = http.createServer(this.app);
    this.httpsServer = https.createServer(this.credentials, this.app);
    this.logger = logger;
    this.app.use(morgan("combined", { stream: this.logger.stream.write }));
    this.app.use(router);
  }

  startServers() {
    try {
      return Promise.allSettled([
        new Promise((resolve, reject) => {
          this.httpServer.listen(this.port, () => {
            this.logger.info(
              `Server running at http://${this.hostname}:${this.port}`
            );
            resolve(true);
          });

          this.httpServer.once("error", (error) => {
            this.logger.error(error);
            reject(error);
          });
        }),

        new Promise((resolve, reject) => {
          this.httpsServer.listen(this.securePort, () => {
            this.logger.info(
              `Server running at https://${this.hostname}:${this.securePort}`
            );
            resolve(true);
          });

          this.httpsServer.once("error", (error) => {
            this.logger.error(error);
            reject(error);
          });
        }),
      ]);
    } catch (error) {
      this.logger.error(error);
    }
  }
}

module.exports = Server;
