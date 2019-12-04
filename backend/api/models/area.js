const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    areaCompleted: { type: Boolean, default: false },
    areaStartDate: { type: String, required: true },
    areaStartTime: { type: String, required: true },
    areaDetails: {
        trash: { type: Number, default: 0 },
        steps: { type: Number, default: 0 },
        squareMeters: { type: Number, default: 0 }
    },
    areaLocationData: {
        type: { type: String, default: 'Polygon' },
        coordinates: { type: Array },
        index: { type: String, default: '2dsphere' }
    },
    areaCreationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Area', areaSchema);