const express = require('express');

const response = require('../../utils/response');
const controller = require('./index');

const router = express.Router();

// rutas
router.get('/', list);
router.get('/ping', ping);

//funciones
function list(req, res, next){
    controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })   
        .catch(next);
}

function ping(req, res, next){
    response.success(req, res, 'pong', 200);
}

module.exports = router;