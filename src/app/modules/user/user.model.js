const {  Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {type: String, required: true ,unique: true},
    email: {type: String, required: true ,unique: true},
    password: {type: String, required: true},
    profileImage: {type: String},
    role: {type: String, default: "user"},
    bio: {type: String ,maxLength: 300},
    timestamp: {type: Date, default: Date.now} 

  });

  const User = model("User", userSchema);

  module.exports = User;