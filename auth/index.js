const jwt = require('jsonwebtoken');
const error = require('../models/error');

function sign(data){
    const userdata = JSON.parse(JSON.stringify(data));
    return jwt.sign(userdata, 'secret');
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
        }
    },
    logged: function(req, owner){
        const decode = decodeHeader(req);
    }
}

function decodeHeader(request){
    const authorization = request.headers.authorization || '';
    const token = getToken(authorization);
    const decode = verify(token);
    request.user = decode;
    return decode;
}

function getToken(authorization){
    if(!authorization){
        throw error('No viene un token', 401);
    }

    if(authorization.indexOf('Bearer ') === -1){
        throw error('Formato invalido', 401);
    }

    const token = authorization.replace('Bearer ', '');
    return token;
}

function verify(token){
    return jwt.verify(token, 'secret');
}
module.exports = {
    sign,
    check,
}