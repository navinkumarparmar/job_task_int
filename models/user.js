const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
         
      name:{
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required:true
      },
      role:{
        type: String,
        enum: ['User','Company'],
        defualt:'User'
      }

      
},
{ timestamps: true}
)


const userModel = new mongoose.model('User',UserModel)

module.exports = userModel;
