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
    const id = req.params.trophyId;
    Trophy.findById(id)
    .exec()
    .then(trophy => {
        console.log(trophy);
        if (trophy) {
            res.status(200).json({
                trophy: trophy,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8626/trophies'
                }
            });
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
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
    const id = req.params.trophyId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Trophy.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Trophy updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8626/trophies/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};
exports.trophy_delete_trophy = (req, res, next) => {
    const id = req.params.trophyId;
    Trophy.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Trophy deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8626/trophies',
                body: { title: 'String', description: 'String', trophyThumbnail: 'Image', trophyPreview: 'Image', trophyAnimation: 'Image' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};