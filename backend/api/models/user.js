const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    userPortrait: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    creationDate: { type: Date, default: Date.now },
    userConsent: { type: Boolean, default: false, required: true },
    userData: {
        completedAreas: [{
            area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true }
        }],
        incompleteAreas: [{
            area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true }
        }],
        totalSqMeters: { type: Number },
        totalSteps: { type: Number },
        totalTrashInGram: { type: Number },
        trophies: [{
            trophy: { type: mongoose.Schema.Types.ObjectId, ref: 'Trophy', required: true },
            dateObtained: { type: Date, default: Date.now }
        }]
    }
});

module.exports = mongoose.model('User', userSchema);