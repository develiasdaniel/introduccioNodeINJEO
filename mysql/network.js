const express = require('express');

const response = require('../utils/response');
const store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', update);

async function list(req, res, next){
    try {
        const listData = await store.list(req.params.table);
        response.success(req, res, listData, 200);
    }
    catch(err){
        next(err);
    }
}

async function get(req, res, next){
    try{
        const data = await store.get(req.params.table, req.params.id);
        response.success(req, res, data, 200);
    }
    catch(err){
        next(err);
    }
}

async function insert(req, res, next){
    try {
        const data = await store.insert(req.params.table, req.body);
        response.success(req, res, data, 200);
    }
    catch(err){
        next(err);
    }
}

async function update(req, res, next){
    try{
        const data = await store.update(req.params.table, req.body);
        response.success(req, res, data, 200);
    }
    catch(err){
        next(err);
    }
}

module.exports = router;