const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true
    }
});

module.exports = Login = mongoose.model('Login', loginSchema);