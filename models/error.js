function err(message, statusCode){
    const error = new Error(message);
    if(statusCode){
        error.statusCode = statusCode;
    }

    return error;
}

module.exports = err;