const express = require('express');
const apiroutes  = express.Router();

const jobApply = require('../controller/jobApply');
const {verifytoken} = require('../middlwere/verifytoken');
const checkpermission = require('../middlwere/checkparmission')

apiroutes.post('/applyjob/:id',verifytoken,checkpermission(['User']),jobApply.applyforJob);
apiroutes.get('/getApplications/:id',verifytoken,checkpermission(['Company','User']),jobApply.getApplications);

module.exports = apiroutes;