const express = require("express");
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const { genVariable } = require("./genVariable");

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ask", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (prompt.length === 0) {
      res.send({ state: false, message: "Input is empty" });
    }
    if (prompt.length > 0) {
      const response = await genVariable(prompt);
      const parsedResponse = JSON.parse(response);
      if (
        Array.isArray(parsedResponse) &&
        parsedResponse[0]?.name &&
        parsedResponse[0]?.reason
      ) {
        res.send({ state: true, data: parsedResponse });
      } else {
        res.send({ state: false, message: "Failed to generate name" });
      }
    }
  } catch {
    res.send({ state: false, message: "Failed to generate name" });
  }
});

http.createServer(app).listen(HTTP_PORT);
https.createServer(options, app).listen(HTTPS_PORT);
