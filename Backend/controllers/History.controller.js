const HistoryModel=require('../models/history.model')

const getHistory=async(req,res)=>{
    try {
        const email=req.query.email
        const history=await HistoryModel.findOne({
            user:email
        })
    
        if(history)
        {
            return res.status(200).json({
                success:true,
                data:history.data
            })
        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Data do not exist"
            })
        }
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:error.message
            })
    }
}

const postHistory=async(req,res)=>{
    // console.log(req.body);
    

    try {
         const prvsHistory=await HistoryModel.findOne({
            user:req.body.user
            
        })
        console.log(prvsHistory);
        if(prvsHistory)
        {
            let prevArray=prvsHistory.data

            for(let index=0;index<prevArray.length;index++)
            {
                console.log(prevArray[index].location);
                if(prevArray[index].location==req.body.data[0].location)
                {
                    return res.status(304).json({
                    success:false,
                    message:"Location Already Exist"
                    }) 
                }
            }

            if(prevArray.length==5)
            {
                prevArray.shift()
                prevArray.push(req.body.data[0])
            }
            else
            {
                prevArray.push(req.body.data[0])
            }
            prvsHistory.save()
            return res.status(200).json({
                success:true,
                message:"Added to history successfully"
                })
        }

        else
        {
            const history=await HistoryModel.create(req.body)
            if(history)
            {
                return res.status(200).json({
                success:true,
                message:"Added to history successfully"
                })
            }
            else
            {
                return res.status(400).json({
                success:false,
                message:"Failed to add history"
                })
            }
        }
        
        
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message
        })
    }

    
}

module.exports={getHistory,postHistory}