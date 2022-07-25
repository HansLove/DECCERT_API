const { json } = require('body-parser')
const User=require('../models/model.user')
// const sha256=require('crypto-js/sha256')

control={}

control.newUser=async(req,res)=>{

    const nuevo=new User(req.body)
    await nuevo.save()
    .then(docs=>{
        res.json({
            data:docs
        })
    })


}




control.dameOneUser=async(req,res)=>{
    const respuesta=await User.find({address:req.params.address})
    res.status(200).json({
        data:respuesta
    })
}

control.editarUser=async(req,res)=>{
    
    let user_address=req.params.address
    await User.findOneAndUpdate({address:user_address},req.body).then(result=>{
        res.status(200).json({
            new:result,
            status:true
        })
    })
       
}



// control.login=async(req,res)=>{

//     try {
//         const {name,password}=req.body
//         console.log('name:' ,name, 'password; ',password)

//         const userData=await user.findOne({name:name})
//         const password_hash=userData.password
        
//         bcrypt.compare(password, password_hash, function(err, result) {

//         const token=jwt.sign({id:userData._id,name:userData.name},
//             process.env.JWT)

//         res.json({
//             respuesta:result,
//             status:true,
//             token:token})
//         });

//     } catch (error) {
//         console.log('error==> ',error)
//         res.json({status:false,respuesta:false})
//     }



// }

control.proof=(req,res)=>{
    res.status(200).json({
        name:'Deccert'
    })
}



module.exports=control;