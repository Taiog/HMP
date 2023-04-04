const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.KEY_MONGODB;

async function main() {
  await mongoose.connect(uri);
}

main().catch((err) => console.log(err));
console.log("teste");
module.exports = mongoose;
