const express = require('express');
const secure = require('./secure');
const router = express.Router();
const response = require('../../utils/response');
const controller = require('./index');

router.get('/', function(req, res, next){
        controller.list()
            .then((users) => {
                response.success(req, res, users, 200);
            })
            .catch(next);
})

router.get('/:id', function(req, res, next){
        const id = req.params.id;
        controller.get(id)
            .then((user) => {
                response.success(req, res, user, 200);
            })
            .catch(next)
})

router.post('/', function(req, res, next){
        controller.insert(req.body)
            .then((user)=> {
                response.success(req, res, user, 200)
            })
            .catch(next)
})

router.delete('/:id', function(req, res, next){
        const id = req.params.id;
        controller.remove(id)
            .then((isremove) => {
                response.success(req, res, isremove, 200)
            })
            .catch(next)
})


router.put('/', secure('update'), function(req, res, next){
    controller.update(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
})

router.post('/register/:courseid',secure('register'), function(req, res, next){
    const idUser = req.user.id;
    const idCourse = req.params.courseid;
    controller.register(idUser, idCourse)
        .then(data => {
            response.success(req, res, data, 200)
        })
        .catch(next);
})

module.exports = router;