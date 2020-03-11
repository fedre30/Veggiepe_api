import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String
});

new mongoose.Schema({});

const user = new mongoose.model("User", schema);

module.exports = user;
