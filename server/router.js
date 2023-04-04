const express = require("express");
const router = express.Router();
const cityDanlimas = require("./DANLIMAS.json");
const User = require("./usersSchema");
const mongoose = require("./db");
const { generateAuthToken } = require("./auth");
const authMiddleware = require("./middleware/authMiddleware");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

router.get("/", (req, res) => {
  res.send("oi");
});

router.get("/api/cities", (req, res) => {
  const randomNumber = getRandomInt(0, cityDanlimas.length);
  const cityMapping = cityDanlimas[randomNumber];

  res.json(cityMapping);
});

router.get("/leaderboard/ranking", async (req, res) => {
  const showRanking = await User.find().sort({ User_score: -1 }).exec();
  res.json(showRanking);
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    return res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/HMP/user", async (req, res) => {
  console.log("nero");
  try {
    const verifyUser = await User.findOne({
      User_email: req.body.User_email,
    }).exec();
    console.log(verifyUser);
    if (verifyUser) {
      console.log("exist");
      const token = generateAuthToken(verifyUser);
      return res.json({ token });
    } else {
      const newUser = await User.create(req.body);
      const token = generateAuthToken(newUser);
      return res.json({ token });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("algo de errado não está certo");
  }
});

module.exports = router;
