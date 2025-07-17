const UserModel = require('../models/user.model')


const signUp=async (req,res)=>{
    try {

        user=await UserModel.find({
            email:req.body.email
        })

        // if(user)
        // {
        //     return res.status(400).json({
        //         success:false,
        //         message:"Email Already Exist"
        //     })
        // }


        createdUser =await UserModel.create(req.body)
    
        if(createdUser)
        {
            return res.status(200).json({
                success:true,
                message:"Account create successfully"
            })
        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Failed to create Account"
            })
        }
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:error.message
            })
    }
    
}



const login =async(req,res)=>{
    try {
        user=await UserModel.findOne({
            email:req.body.email,
            password:req.body.password
        })
    
        if(user)
        {
            return res.status(200).json({
                success:true,
                message:"Login Successfully"
            })
        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:error.message
            })
    }
}

module.exports={signUp,login}