const mongoose=require('mongoose')

const scheme=mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String},
    address:{type:String,required:true},
    description:{type:String}
})

module.exports=mongoose.model('User',scheme)