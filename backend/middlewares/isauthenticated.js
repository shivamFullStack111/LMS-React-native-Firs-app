const jwt = require('jsonwebtoken')

const isauthenticated=async(req,res,next)=>{
   try {
    const {authorization}=req.headers

    if(!authorization) return res.send({success:false,message:'token is required'})
   
    const {user}=await jwt.verify(authorization,process.env.JWT_SECRET)

    if(!user) return res.send({success:false,message:'unauthorized user'})

      req.user = user

      next()
    
   } catch (error) {
    return res.send({success:false,message:error.message})
   }
}

module.exports = isauthenticated