
const { default: mongoose } = require('mongoose');
const jobApplication = require('../models/applicationModel');
const jobModel = require('../models/jobModel');


module.exports.applyforJob = async function(req,res,next) {

     try {
        const job = req.params.id
        const applicant = req.user
console.log("job",job)
        const jobid = new mongoose.Types.ObjectId(job);

        console.log("job",job);
        console.log("applicant",applicant);
       
         const jobids = await jobModel.findById(job)
                if(!jobids){
                  return res.status(404).json({
                      message: "job not found"
                  })
                }

                // console.log("jobid",jobid)

       const application = new jobApplication({
        job:jobid,
        applicant:applicant.id
       })

       await application.save();
       return res.status(201).json({
        message: "Application submitted succesfully",
        data: application
       })
        
     } catch (error) {
      return res.status(500).json({
        message:"something went wrong",
        error: error.message
        
     })
    
}
}

module.exports.getApplications = async function(req,res,next) {

      try {

        const id = req.params.id

           const application = await application.find({
           job: id
           }).populate('applicant','name','email')

           return res.status(200).json({

              message: "succesfully get applications",
              data: application
           })


        
      } catch (error) {

      return res.status(500).json({
        message: "something went wrong",
        error: error.message
      })
        
      }
  
}
