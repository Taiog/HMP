const express = require("express");
const router = express.Router();
const cityDanlimas = require("./DANLIMAS.json");
const User = require("./usersSchema");
const redis = require("redis");
const { generateAuthToken } = require("./auth");
const authMiddleware = require("./middleware/authMiddleware");
const { OAuth2Client } = require("google-auth-library");
const clientRedis = redis.createClient({
  url: process.env.REDIS_URL,
});
clientRedis.connect();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

router.post("/auth/google", async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens

  res.json(tokens);
});

router.get("/", (req, res) => {
  res.send("oi");
});

router.get("/api/cities", async (req, res) => {
  const randomNumber = getRandomInt(0, cityDanlimas.length);
  const cityMapping = cityDanlimas[randomNumber];

  const population = await clientRedis.set(
    cityMapping.id,
    cityMapping.population
  );

  let cityMappingNoPop = { ...cityMapping };
  cityMappingNoPop.population = "";
  res.json(cityMappingNoPop);
});

router.get("/api/population/:id", async (req, res) => {
  const population = await clientRedis.get(req.params.id);
  res.json(population);
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
  try {
    const verifyUser = await User.findOne({
      User_email: req.body.User_email,
    }).exec();
    if (verifyUser) {
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

router.put("/HMP/updateScore", async (req, res) => {
  try {
    const getUser = await User.findOne({
      User_email: req.body.User_email,
    }).exec();
    if (getUser && getUser.User_score < req.body.User_score) {
      getUser.User_score = req.body.User_score;
      await getUser.save();
      return res.send(getUser);
    }
    return res.json("minor score");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
