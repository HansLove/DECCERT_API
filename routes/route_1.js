const express=require('express')
const router=express.Router()
const control=require('../controller/controller')

router.get('/',control.funcionCool)
router.get('/:id',control.firmarCertificado)
router.post('/',control.nuevaAcademia)

module.exports=router;