const jobModel = require('../models/jobModel');
const userModel = require('../models/user');

module.exports.createJob = async function(req,res,next) {

        try {
             const jobdetails = req.body;
             const company = req.user.role

             console.log("jobdetails",jobdetails)

           

             const job = new jobModel({
                ...req.body,
                company:req.user.id
             }

             )
    
              await job.save();
              return res.status(201).json({
                message: "succesFully job created",
                data: job
              })
        } catch (error) {

            return res.status(500).json({
                message: "something went wrong",
                error: error.message
            })
            
        }
    
    
}


module.exports.getJobs = async function(req,res,next) {
    try {

        const {location,jobType,minSalary,maxSalary,page=1,limit=10} = req.query;

        const filter = {};

        if(location) {
            filter.location = location
        }
        if(jobType){
            filter.jobType = jobType
        }

        if(minSalary || maxSalary){
            filter.salary = {
                ...(minSalary && { $gte: minSalary}),
                ...arguments(maxSalary && {$lte: maxSalary})
            }

        }

        const jobs = await jobModel.find(filter)
        .skip((page-1)*limit)
        .limit(parseInt(limit));

        return res.status(200).json({
            message: "succesFully fetch jobs",
            data: jobs
        })

    } catch (error) {
        
        return res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
        
    }
    
}


module.exports.getjobBYid = async function(req,res,next) {

     try {
         const jobid = req.params.id;
           
         const job = await jobModel.findById(jobid)
         if(!job){
           return res.status(404).json({
               message: "job not found"
           })
         }
          
         return res.status(200).json({
           message: "SuccessFully get job",
           data: job
         })
     } catch (error) {

        return res.status(500).json({
            message:"something went wrong",
            error: error.message
        })
        
     }
    
}

module.exports.delete =async function(req,res,next) {
     
        try {
            
            const jobid = req.params.id;
            const job = await jobModel.findById(jobid)
            if(!job){
              return res.status(404).json({
                  message: "job not found"
              })
            }

      await jobModel.findByIdAndDelete(jobid);
      return res.status(200).json({
        message: "job deleted succesfully",

      })
        } catch (error) {

  return res.status(500).json({
            message:"something went wrong",
            error: error.message
        })
        
        }

}

module.exports.update = async function(req,res,next) {

        try {
             const jobid = req.params.id;
             const updatedata = req.body
    
          const job = await jobModel.findById(jobid)
                if(!job){
                  return res.status(404).json({
                      message: "job not found"
                  })
                }
    
                const updatejob = await jobModel.findByIdAndUpdate(jobid,updatedata,{
                    new:true
                })
    
                return res.status(200).json({
                    message: "successfully update job",
                    
                })
        } catch (error) {      
       return res.status(500).json({
        message:"something went wrong",
        error: error.message
})
            
        }
}
