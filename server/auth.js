const jwt = require("jsonwebtoken");
const User = require("./usersSchema");
require("dotenv").config();

const generateAuthToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      User_email: user.User_email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "72h",
    }
  );

  return token;
};

const verifyAuthToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
