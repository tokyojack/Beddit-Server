function errorHandle(err, req, res, next){
    console.log(err);
    return res.status(err.status || 500).json({
        error: {
            message: err.message || "Uh oh, something went wrong."
        }
    })
}

module.exports = errorHandle;