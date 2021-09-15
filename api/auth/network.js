const express = require('express');
const response = require('../../utils/response');
const controller = require('./index');
const router = express.Router();

router.post('/login', function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    controller.login(username, password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        })
});

module.exports = router;