const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

const User = require('../models/user');

exports.user_get_all = (req, res, next) => {
    User.find()
    .select('-__v -password')
    .exec()
    .then(users => {
        const response = {
            count: users.length,
            users: users
        };
        console.log(response);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) { //if a user exists with that email
            return res.status(409).json({
                message: 'An account has already been created using that Email address'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        userConsent: req.body.userConsent
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created',
                            request: {
                                type: 'GET',
                                url: 'http://localhost:8626/user/' + user._id
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    })
};

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email }) //find returns an array, our implementation means we should only get 1 entry though
    .exec()
    .then(user => {
        if (user.length < 1) { //if we got no user
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => { //plaintext pw, hashed pw, callback
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, secretKey, { expiresIn: '1h'} );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    userId: user[0]._id
                });
            }
            //if neither condition were met
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.user_complete_area = (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {"userData.completedAreas": { area: req.body.areaId }}},
        {safe: true, upsert: true}
    ).exec()
    .then(user => {
        console.log("Completed area", user);
        if (user) {
            res.status(200).json({
                message: 'Successfully completed area',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8626/user/' + user._id
                }
            });
        } else {
            res.status(404).json({message: "Could not complete area"});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.user_add_area = (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {"userData.incompleteAreas": { area: req.body.areaId }}},
        {safe: true, upsert: true}
    ).exec()
    .then(user => {
        console.log("Added area to user", user);
        if (user) {
            res.status(200).json({
                message: 'Successfully added area to user',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8626/user/' + user._id
                }
            });
        } else {
            res.status(404).json({message: "Could not add area to user"});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.user_remove_area = (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {"userData.incompleteAreas": { area: req.body.areaId }}},
        {safe: true, upsert: true}
        ).exec()
        .then(user => {
            console.log("Removes area from incompleteAreas", user);
            if (user) {
                res.status(200).json({
                    message: 'Succesfully removed area from incompleteAreas',
                    request: {
                        type: 'PATCH',
                        url: 'http://localhost:8626/user/' + user._id
                    }
                });
            } else {
                res.status(404).json({message: "Could not remove area from user"});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_remove_completed_area = (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {"userData.completedAreas": { area: req.body.areaId }}},
        {safe: true, upsert: true}
        ).exec()
        .then(user => {
            console.log("Removes area from completedAreas", user);
            if (user) {
                res.status(200).json({
                    message: 'Succesfully removed area from completedAreas',
                    request: {
                        type: 'PATCH',
                        url: 'http://localhost:8626/user/' + user._id
                    }
                });
            } else {
                res.status(404).json({message: "Could not remove completed area from user"});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_get_user = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('-__v -password')
    .populate({
        path: 'userData.incompleteAreas.area',
        select: 'title areaCompleted areaStartDate areaStartTime areaDetails',
        model: 'Area'
    })
    .populate({
        path: 'userData.completedAreas.area',
        select: 'title areaCompleted areaStartDate areaStartTime areaDetails',
        model: 'Area'
    })
    .exec()
    .then(user => {
        console.log(user);
        if (user) {
            res.status(200).json({
                user: user,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8626/user'
                }
            })
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

exports.user_update_user = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8626/user/' + id
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

exports.user_delete_user = (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};