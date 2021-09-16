const express = require('express');
const secure = require('./secure');
const router = express.Router();
const response = require('../../utils/response');
const controller = require('./index');

router.get('/', function(req, res){
        controller.list()
            .then((users) => {
                response.success(req, res, users, 200);
            })
            .catch((error) => {
                response.error(req, res, error.message, 500);
            });
})

router.get('/:id', function(req, res){
        const id = req.params.id;
        controller.get(id)
            .then((user) => {
                response.success(req, res, user, 200);
            })
            .catch((err) => {
                response.error(req, res, err.message, 500);
            })
})

router.post('/', function(req, res){
        controller.insert(req.body)
            .then((user)=> {
                response.success(req, res, user, 200)
            })
            .catch((err) => {
                response.error(req, res, err.message, 500)
            })
})

router.delete('/:id', function(req, res){
        const id = req.params.id;
        controller.remove(id)
            .then((isremove) => {
                response.success(req, res, isremove, 200)
            })
            .catch((err) => {
                response.error(req, res, err.message, 500)
            })
})


router.put('/', secure('update'), function(req, res){
    controller.insert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
})

module.exports = router;