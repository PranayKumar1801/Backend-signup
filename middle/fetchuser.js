var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Pranay$oy';

const fetchuser=(req,res,next)=>{
    //get the userr from jwt token and add id to req object

    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please use valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please use valid token"})
    }
    
}
module.exports=fetchuser;