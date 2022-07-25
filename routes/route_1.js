const express=require('express')
const router=express.Router()
const control=require('../controller/controller')

router.get('/:id',control.firmarCertificado)
router.post('/:id/:address/:name',control.SmartTest)

module.exports=router;