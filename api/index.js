const express = require('express');
const config = require('../config');
const user = require('./user/network');
const auth = require('./auth/network');
const app = express();

app.use(express.json());
app.use('/user', user);
app.use('/auth', auth);

app.listen(config.api.port, () => {
    console.log(`Proyecto deployado ${config.api.host}:${config.api.port}`);
});
