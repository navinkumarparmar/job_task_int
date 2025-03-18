const mongoose = require('mongoose');

const JobModel = new mongoose.Schema({
         
      title:{
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required:true
      },
      salary:{
        type: Number,
      }, 
      jobType: {
        type: String,
        required:true
      } ,
      requirements: {
        type: String,
        required:true
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
},
{ timestamps: true}
)


const jobModel = new mongoose.model('Job',JobModel)

module.exports = jobModel;
