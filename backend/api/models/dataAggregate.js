const mongoose = require('mongoose');

const dataAggregateSchema = mongoose.Schema({
    steps: { type: Number },
    squareMeters: { type: Number },
    trashInGram: { type: Number },
    completedAreas: { type: Number }
});

module.exports = mongoose.model('DataAggregate', dataAggregateSchema);