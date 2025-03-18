const express = require('express');
const apiroutes  = express.Router();

const auth = require('./auth');
const job = require('./job');
const apply = require('./apply');
apiroutes.use('/auth',auth);
apiroutes.use('/job',job);
apiroutes.use('/apply',apply)

module.exports = apiroutes;