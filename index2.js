const { Worker } = require("worker_threads");
const path = require("path");
const express = require("express");
const app = express();

app.get("/heavy", async (req, res) => {
  const worker = new Worker(path.join(__dirname, "worker.js"));
  worker.on("message", (msg) => {
    console.log(msg);
    return res.status(200).send("Downloaded the pdf");
  });
  worker.on("error", (err) => {
    console.log(err);
    return res.status(400).send(err);
  });
  worker.postMessage(path.join(__dirname, "test.txt"));
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});