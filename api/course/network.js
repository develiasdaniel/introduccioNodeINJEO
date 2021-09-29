const express = require('express');

const response = require('../../utils/response');
const controller = require('./index');

const router = express.Router();

// rutas
router.get('/', list);

//funciones
function list(req, res, next){
    controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })   
        .catch(next);
}

module.exports = router;