const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verbSchema = new Schema({
    sourceName: {
        type: String,
        required: true,
        unique: true
    },
    v1: {
        type: String,
        required: true,
        unique: true
    },
    v2: {
        type: String,
        required: true,
        unique: true
    },
    v3: {
        type: String,
        required: true,
        unique: true
    },
    wrongV1: {
        type: String,
        required: true
    },
    wrongV2: {
        type: String,
        required: true
    },
    wrongV3: {
        type: String,
        required: true
    },
    gifUrl: String,
    audioUrl: String
});

module.exports = Verb = mongoose.model('Verb', verbSchema);

