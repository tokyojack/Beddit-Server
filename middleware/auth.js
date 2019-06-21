const jwt = require("jsonwebtoken");

// Make sure user is logged in - Authentication
exports.loginRequired = function (req, res, next) {
    try {
        // Splits the header (something like "Bearer asdasdasd") to get the jwt
        const token = req.headers.authorization.split(" ")[1];

        // Compares to see if its a legit login
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please login first"
                })
            }
        });
    } catch (err) {
        next({
            status: 401,
            message: "Please login first"
        });
    }
}