const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const router = require("./router");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Example app listening on http://localhost:${process.env.PORT || 3001}`
  );
});
