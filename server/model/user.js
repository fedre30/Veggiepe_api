var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String
});

new mongoose.Schema({});

var user = new mongoose.model("User", schema);

module.exports = user;
