const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    phone: { type: Number },
    email: { type: String },
    image:{type: String}
});

module.exports = mongoose.model("users", UserSchema);
