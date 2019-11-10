const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) { //if a user exists with that email
            return res.status(409).json({
                message: 'Mail exists'
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
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
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
                    token: token
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