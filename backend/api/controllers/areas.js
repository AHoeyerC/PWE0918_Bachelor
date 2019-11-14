const mongoose = require('mongoose');
const Area = require('../models/area');
const User = require('../models/user');
//hello
exports.areas_get_all = (req, res, next) => {
    Area.find()
    .select('-__v')
    .exec()
    .then(areas => {
        console.log(areas);
        const response = {
            count: areas.length,
            areas: areas,
            request: {
                type: 'GET',
                url: 'http://localhost:8626/areas'
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

exports.areas_create_area = (req, res, next) => {
    User.findById(req.body.userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const area = new Area({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            user: req.body.userId,
            areaLocationData: {
                type: req.body.areaLocationData.type,
                coordinates: req.body.areaLocationData.coordinates
            }
        });
        return area.save();
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Area created successfully',
            createdArea: {
                _id: result._id,
                title: result.title,
                user: result.user,
                areaLocationData: {
                    type: result.areaLocationData.type,
                    coordinates: result.areaLocationData.coordinates
                }
            },
            request: {
                type: 'GET',
                url: 'http://localhost:8626/areas/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.areas_get_area = (req, res, next) => {
    Area.findById(req.params.areaId)
    .select('-__v')
    .populate({
        path: 'user',
        select: '_id firstName lastName username email',
        model: 'User'
    })
    .exec()
    .then(area => {
        if (!area) {
            return res.status(404).json({
                message: 'Area not found'
            });
        }
        res.status(200).json({
            area: area,
            request: {
                type: 'GET',
                url: 'http://localhost:8626/areas'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.areas_update_area = (req, res, next) => {
    const id = req.params.areaId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Area.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Area updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8626/areas/' + id
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

exports.areas_delete_area = (req, res, next) => {
    const id = req.params.areaId;
    Area.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Area deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8626/areas',
                body: { 
                    title: 'String',
                    userId: 'Id',
                    areaLocationData: {
                        type: 'String',
                        coordinates: '[Number]' 
                    },
                }
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