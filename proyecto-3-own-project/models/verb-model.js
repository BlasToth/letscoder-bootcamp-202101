const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verbSchema = new Schema({
    sourceName: String,
    v1: String,
    v2: String,
    v3: String,
    wrongV1: String,
    wrongV2: String,
    wrongV3: String,
    gifUrl: String,
    audioUrl: String
});

module.exports = Verb = mongoose.model('Verb', verbSchema);

