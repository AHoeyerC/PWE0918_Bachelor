const mongoose = require('mongoose');
const Trophy = require('../models/trophy');

exports.trophy_get_trophies = (req, res, next) => {
    Trophy.find()
    .exec()
    .then(trophies => {
        console.log(trophies);
        const response = {
            count: trophies.length,
            trophies: trophies,
            request: {
                type: 'GET',
                url: 'http://localhost:8626/trophies'
            }
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};
exports.trophy_get_trophy = (req, res, next) => {
    
};
exports.trophy_create_trophy = (req, res, next) => {
    console.log(req.files);
    if (req.files.length === 3) {
        const trophy = new Trophy({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            trophyThumbnail: req.files[0].path, 
            trophyPreview: req.files[1].path, 
            trophyAnimation: req.files[2].path 
        });
        trophy.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created trophy successfully',
                createdTrophy: {
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    trophyThumbnail: result.trophyThumbnail,
                    trophyPreview: result.trophyPreview,
                    trophyAnimation: result.trophyAnimation
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    } else {
        res.status(500).json({
            message: 'Please make sure to upload a thumbnail, a preview and an animation. (3 files)'
        });
    }
};
exports.trophy_update_trophy = (req, res, next) => {

};
exports.trophy_delete_trophy = (req, res, next) => {

};