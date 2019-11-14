const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //splits at the first whitespace "Bearer token"
        const decoded = jwt.verify(token, secretKey);
        req.decodedUserData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};