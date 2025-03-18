const mongoose = require('mongoose');

const ApplicationModel = new mongoose.Schema({
     
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required:true
        },
        applicant : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
           
        },
        status: {
            type: String,
            enum: ["pending","accepted","rejected"],
            default:'pending'
        }

},
{
    timestamps:true
}
)


const jobApplication = new mongoose.model('JobApplication',ApplicationModel)

module.exports = jobApplication;
