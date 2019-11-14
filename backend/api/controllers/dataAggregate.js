const mongoose = require('mongoose');
const DataAggregate = require('../models/dataAggregate');

exports.dataAggregate_get = (req, res, next) => {
    DataAggregate.find()
    .select('-__v')
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            data: result,
            request: {
                type: 'GET',
                url: 'http://localhost:8626/dataaggregate'
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

exports.dataAggregate_create = (req, res, next) => {
    const dataAggregate = new DataAggregate();
    dataAggregate.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created dataAggregate successfully',
            createdAggregate: {
                steps: result.steps,
                squareMeters: result.squareMeters,
                trashInGram: result.trashInGram,
                completedAreas: result.completedAreas,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8626/dataaggregate/'
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

exports.dataAggregate_get_one = (req, res, next) => {
    const id = req.params.dataId;
    DataAggregate.findById(id)
    .select('-__v')
    .exec()
    .then(result => {
        console.log(result);
        if (result) {
            res.status(200).json({
                data: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8626/dataaggregate'
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

exports.dataAggregate_update = (req, res, next) => {
    const id = req.params.dataId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    DataAggregate.updateOne({_id: id}, { $inc: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Data updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8626/dataaggregate/'
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