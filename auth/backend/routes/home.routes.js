const jwt = require('jsonwebtoken')


const verifyUser =(req,res,next)=>{
    const token = req.cookes.token;
    if(!token){
        return res.status(401).json({message:"Token not found"})

    }else{
        jwt.verify(token,JWTSECRET,(err,decoded)=>{
            if(err) return res.status(401).json({message:"Token is wrong"})
        })
    }
}

app.get() 