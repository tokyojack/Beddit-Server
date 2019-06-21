const db = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });

        let {
            id,
            username,
            profileImageUrl
        } = user
        // Checks if the hashed password in the DB is the same as the provided one
        let isMatch = await user.comparePassword(req.body.password);

        if (isMatch) {
            // Generates jwt token
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid email/password"
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid email/password"
        });
    }
}

exports.signup = async function (req, res, next) {
    try {
        let user = await db.User.create(req.body);

        let {
            id,
            username,
            profileImageUrl
        } = user;

        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        // Error code is mongoose-related
        if (err.code === 11000) 
            err.message = "Sorry that username and/or email is taken!"
        
        return next({
            status: 400,
            message: err.message
        })
    }
}