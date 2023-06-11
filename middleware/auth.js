const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            const verifiedUser = await jwt.verify(token, config.SECRET_KEY);
            const user = await User.findOne({ _id: verifiedUser._id });
            req.token = token;
            req.user = user;
        }
        next();
    } catch (err) {
        res.status(401).json({
            error: true,
            message: err,
            jwt : "",
            username : ""
        })
    }
}

module.exports = auth;