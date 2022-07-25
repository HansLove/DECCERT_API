const express=require('express')
const router=express.Router()
const control=require('../controller/controller.user')

router.get('/:address',control.dameOneUser)
router.post('/',control.newUser)
router.patch('/:address',control.editarUser)



module.exports=router;