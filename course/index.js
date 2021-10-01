const express = require('express');
const config = require('../config');
const course = require('./course/network');
const response = require('../utils/response');
const errors = require('../utils/errors');

const app = express();

app.use(express.json());

//ROUTER
app.use('/course', course);
app.use(errors);

app.listen(config.course.port, () => {
    console.log('Servicio escuchando en puerto:', config.course.port)
});