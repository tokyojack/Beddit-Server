const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

// Provided Heroku Mongolab URI
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/beddit", {
    keepAlive: true,
    useNewUrlParser: true
});

module.exports.User = require('./user')
module.exports.Category = require('./category')
module.exports.Post = require('./post')