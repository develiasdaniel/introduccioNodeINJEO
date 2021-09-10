const express = require('express');
const config = require('../config');
const user = require('./user/network');
const app = express();

app.use(express.json());
app.use('/user', user);

app.listen(config.api.port, () => {
    console.log(`Proyecto deployado ${config.api.host}:${config.api.port}`);
});
