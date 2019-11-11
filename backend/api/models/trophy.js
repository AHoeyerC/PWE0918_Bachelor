const mongoose = require('mongoose');

const trophySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    trophyThumbnail: { type: String, required: true },
    trophyPreview: { type: String, required: true },
    trophyAnimation: { type: String, required: true }
});

module.exports = mongoose.model('Trophy', trophySchema);