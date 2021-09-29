const express = require('express');
const config = require('../config');
const router = require('./network');
const errors = require('../utils/errors');

const app = express();
app.use(express.json());

// comoonentes
app.use('/', router);
app.use(errors);

app.listen(config.mysqlService.port, () => {
    console.log(`Serivico de MYSQL corrriendo en el puerto ${config.mysqlService.port}`);
});