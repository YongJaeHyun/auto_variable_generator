const express = require("express");
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const { genVariable } = require("./genVariable");

const PORT = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT);
