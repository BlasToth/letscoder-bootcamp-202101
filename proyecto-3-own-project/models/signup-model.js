const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        required: true,
        unique: true
    },
    knownVerbs: [{
        type: String
    }],
    points: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "basic"
    } 
}, 
{ timestamps: true });

module.exports = User = mongoose.model('User', userSchema);