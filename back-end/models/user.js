const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", userSchema);