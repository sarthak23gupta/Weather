const express=require('express')
const path=require('path')
const PORT=4444;
const app=express();


const cors=require('cors')
app.use(cors())

const connectDB = require('./db/db');
connectDB();

const router=require('./routers/User.route')
const historyrouter=require('./routers/History.route')
app.use(express.json())
app.use('/',router)
app.use('/history',historyrouter)

app.listen(PORT,()=>{
    console.log(`http:localhost:`+PORT);
})