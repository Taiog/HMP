const { verifyAuthToken } = require("../auth");

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const splitHeader = header.split(" ");
    if (splitHeader.length !== 2) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = splitHeader[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await verifyAuthToken(token);

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authMiddleware;
