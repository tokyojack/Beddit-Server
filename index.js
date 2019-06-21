require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const errorHandler = require("./handlers/error")
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const postRoutes = require("./routes/postRoutes")
const morgan = require("morgan");

// For deployment
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Api routes
app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/post", postRoutes)


// Sends error message rather than the default normal one(security risk)
app.use(function (req, res, next) {
    let err = new Error("Not found")
    err.status = 404;
    next(err);
});
app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`🚀 Server has started on port ${PORT}`);
});