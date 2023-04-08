const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.set("static", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let template = fs.readFileSync("public/index.html");
  res.render("welcome");
});

app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
