const jwt = require('jsonwebtoken');

function sign(data){
    return jwt.sign(data, 'secret');
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        if (decoded.id !== owner) {
            throw new Error('No puedes hacer esto');
        }
    },
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
        throw new Error("No viene un token");
    }

    if(authorization.indexOf('Bearer ') === -1){
        throw new Error('Formato invalido');
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