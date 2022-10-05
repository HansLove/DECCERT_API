const express=require('express')
const router=express.Router()
const control=require('../controller/controller.nft')

router.get('/:id',control.firmarCertificado)
router.post('/:id/:address/:name/:chain',control.SmartTest)

module.exports=router;