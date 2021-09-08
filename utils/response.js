exports.success = function(req, res, message, status){
    res.status(status).send({
        error: false,
        statusCode : status,
        body : message,
        errorMessage : null,
    });
}

exports.error = function(req, res, message, status){
    res.status(status).send({
        error: true,
        statusCode: status,
        body: null,
        errorMessage: message
    });
}