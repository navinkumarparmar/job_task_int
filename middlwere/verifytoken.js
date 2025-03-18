const jwt = require('jsonwebtoken');

module.exports.verifytoken = async function(req,res,next) {

    try {
        
       const token = req.headers['token'];
       if(!token){
        return res.status(404).json({
            message: "token not found"
        })
       }

       const verified = jwt.verify(token,process.env.Secretkey);
       req.user = verified;
       next()

    } catch (error) {

        return res.status(500).json({
            message: "Something Went Wrong",
            error: error.message
        })


        
    }
    
}