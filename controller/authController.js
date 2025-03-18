const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

module.exports.register = async function(req,res,next) {
   try {
    
        const userdata = req.body; 
        console.log("userdata",userdata)

        const isUser = await userModel.findOne({email:userdata.email});
        if(isUser){
                return res.status(400).json({
                        message: "User is already registed,plase try with onther email"
                })
        }

        userdata.password = await bcryptjs.hash(userdata.password,10);

        const user = new userModel(userdata)

        await user.save();

        return res.status(201).json({
                message: "succesFully created user",
                data: user
        })

       
} catch (error) {

        return res.status(500).json({
                message: "Something went wrong",
                error: error.message
        })
}
}


module.exports.login = async function(req,res,next) {
       try {
           const {email,password} = req.body;
 
         const isUser = await userModel.findOne({email:email});
         if(!isUser){
                return res.status(400).json({
                        message: "User not found",
                     
                })
         }

         const validpassword = await bcryptjs.compare(password,isUser.password)
         if(!validpassword){
                return res.status(400).json({
                        message: "invalid password"
                })
         }

         const token = jwt.sign({
                id: isUser.id,
                email:isUser.email,
                role:isUser.role
         },
                process.env.Secretkey,
                {
              expiresIn:'5h'
                }

        )
        return res.status(200).json({
                message: "succesfully user login",
                data: isUser,
                token:token
        })

        } catch (error) {
                return res.status(500).json({
                        message: "Something went wrong",
                        error: error.message
                })
       }
}