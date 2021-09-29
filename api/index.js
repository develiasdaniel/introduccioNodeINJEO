const express = require('express');
const config = require('../config');
const user = require('./user/network');
const auth = require('./auth/network');
const course = require('./course/network');
const errors = require('../utils/errors');
const app = express();

app.use(express.json());
app.use('/user', user);
app.use('/auth', auth);
app.use('/course', course);
app.use(errors);

app.listen(config.api.port, () => {
    console.log(`Proyecto deployado ${config.api.host}:${config.api.port}`);
});
