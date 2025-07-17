const express=require('express')
const {getHistory,postHistory} = require('../controllers/History.controller')

const router=express.Router()

router.get('/',getHistory)
router.post('/',postHistory)

module.exports=router