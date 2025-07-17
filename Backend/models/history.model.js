const {Schema,model} =require('mongoose')


const HistorySchema=new Schema({
    user:{
        type:String,
        unique:false
    },

    data:[
        {
            "location":String,
            "temprature":Number,
            "humidity":Number,
            "minimum":Number,
            "maximum":Number
        }
    ]
})

const HistoryModel=model('WeatherHistory',HistorySchema)
module.exports=HistoryModel