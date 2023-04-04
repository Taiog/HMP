const mongoose = require("mongoose");
const uri =
  "mongodb+srv://taiog:789123@cluster0.o0zbrth.mongodb.net/HMP?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(uri);
}

main().catch((err) => console.log(err));
console.log("teste");
module.exports = mongoose;
