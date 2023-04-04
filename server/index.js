const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const http = require("http");
const router = require("./router");

app.use(cors());
app.use(express.json());

app.use(router);

app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
