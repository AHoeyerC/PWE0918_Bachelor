const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const { mongodbPassword } = require('./config');

//Logging
app.use(morgan('dev'));

//Multer - makes the uploads folder publically available
app.use('/uploads', express.static('uploads'));

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Append headers to any routes (Placed before the routes, fixes CORS errors)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

        //return is used because of additional responses, empty object because no routes are used - just the response code
        return res.status(200).json({});
    }
    next();
});

//Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//Database connection
mongoose.connect('mongodb+srv://pwe0918_admin:' + mongodbPassword + '@pwe0918-bachelor-anp5j.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

//Incase none of the routes could handle the incoming request
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); //forwards the error request
});

//Handles errors thrown from anywhere in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;