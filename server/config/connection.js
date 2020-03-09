const mongoose = require("mongoose");

const URL = process.env.URL || "mongodb://127.0.0.1:27017/veggiepe";

mongoose.set("useCreateIndex", true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

//Connection establishment
mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
//Models
// require('../model/user');
const db = mongoose.connection;

db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log("DB Connection established successfully");
});
