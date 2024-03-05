// custom middleware to log requests

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

function logger(req, res, next) {
  console.log("Request received:", req.url, req.method);
  next();
}

app.use(logger);

app.post("/submit", (req, res) => {
  res.send("hello, world!!!!!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
