const errorHanlder = (err, req, res, next) => {
    let errorCode;
    if (!res.statusCode || res.statusCode === 200) errorCode = 500;
    else errorCode = res.statusCode;

    res.status(errorCode).json({
        message: err.message,
        stack: err.stack,
    });
};

module.exports = errorHanlder;
