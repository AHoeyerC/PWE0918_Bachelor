const mongoose = require('mongoose');

const dataAggregateSchema = mongoose.Schema({
    steps: { type: Number, default: 0 },
    squareMeters: { type: Number, default: 0 },
    trashInGram: { type: Number, default: 0 },
    completedAreas: { type: Number, default: 0 }
});

module.exports = mongoose.model('DataAggregate', dataAggregateSchema);