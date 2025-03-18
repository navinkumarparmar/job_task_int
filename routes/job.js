const express = require('express');
const apiroutes  = express.Router();

const jobController = require('../controller/jobController');
const {verifytoken} = require('../middlwere/verifytoken');
const checkpermission = require('../middlwere/checkparmission')

apiroutes.post('/createJob',verifytoken,checkpermission(['Company']),jobController.createJob);
apiroutes.get('/getjobs',verifytoken,checkpermission(['Company','User']),jobController.getJobs);
apiroutes.get('/getjobBYid/:id',verifytoken,checkpermission(['Company','User']),jobController.getjobBYid)
apiroutes.delete('/deletejob/:id',verifytoken,checkpermission(['Company']),jobController.delete)
apiroutes.put('/updatejob/:id',verifytoken,checkpermission(['Company']),jobController.update)
module.exports = apiroutes;