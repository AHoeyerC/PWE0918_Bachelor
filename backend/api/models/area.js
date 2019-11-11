const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    areaCompleted: { type: Boolean, required: true },
    areaDetails: {
        trash: { type: Number },
        steps: { type: Number },
        squareMeters: { type: Number }
    },
    areaLocationData: {
        type: { type: String, default: 'Polygon' },
        coordinates: { type: [Number] },
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Area', areaSchema);