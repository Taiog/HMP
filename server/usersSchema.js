let mongoose = require("./db");

let usersSchema = new mongoose.Schema({
  User_ID_google: { type: "String", require: true },
  User_name: { type: "String", require: true },
  User_email: { type: "String", require: true },
  User_score: { type: "Number", require: true },
  User_date: {
    type: "Date",
    default: Date.now() - 3 * 60 * 60 * 1000,
    require: true,
  },
});

//eventsSchema.path("venue").validate(function (value) {
//  return value && value.trim().length;
//}, "Venue cannot be empty");

const User = mongoose.model("users", usersSchema);
module.exports = User;
