const User=require('./../models/user')
const jwt=require('jsonwebtoken')
const {promisify}=require('util');




//for creating jwt tokn 
const signToken=id=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:90000000
     })
}

exports.signup=async (req,res,next)=>{
    const newUser=await User.create(req.body);
    console.log("this is under signup function")
     const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
        expiresIn:90000000
     })

     try{
    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    })
}
catch(err)
{
    res.status(400).json({
        status: 'failure',
        message:err
      });
}

}

exports.login= async (req,res,next)=>{
    const {email,password}=req.body;

    //check if the email or password exists 
      if(!email ||!password)
      {
         res.status(400).json(
            {
                status:"failed",
                message:"email or password is not entered"
            }
         )
         return ;
      }




    //check if user exists and password is correct 
     const user= await User.findOne({email}).select('+password');
     if(!user||!(await user.correctPassword(password,user.password)))
     {
        return res.status(401).json({
            status:"failed",
            message:"incorrect email or password "
        })
     }

    //if everything is ok send token to client
    const token=signToken(user._id);

    res.status(200).json({
        status:"success",
        token
        
    })
     


    next();
    
}

// exports.protect=async (req,res,next)=>{
//     //1getting token and check if it's there
//     let token;
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
//     {
//          token=req.headers.authorization.split('')[1];
//     }
//     if(!token)
//     {
//         res.status(401).json(
//             {
//                 status:"failed",
//                 message:"you are not logged in please log in to get access"
//             }
//         )
       
//     }




//     //2verification of the token
//     promisify(jwt.verify)
    

//     //check if user still exists 





//     //check if user changed password after the token was issued 





// }