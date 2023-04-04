const jwt = require("jsonwebtoken");
const User = require("./usersSchema");
require("dotenv").config();

const generateAuthToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      User_email: user.User_email,
    },
    "nero",
    {
      expiresIn: "72h",
    }
  );

  return token;
};

const verifyAuthToken = async (token) => {
  try {
    const decoded = jwt.verify(token, "nero");

    const user = await User.findOne({
      _id: decoded._id,
    });

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
