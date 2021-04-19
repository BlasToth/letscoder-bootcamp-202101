const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verbSchema = new Schema({
    sourceName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    v1: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    v2: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    v3: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    wrongV1: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    wrongV2: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    wrongV3: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    gifUrl: String,
    audioUrl: String
});

module.exports = Verb = mongoose.model('Verb', verbSchema);

