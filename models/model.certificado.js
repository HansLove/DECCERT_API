const mongoose=require('mongoose')

const academyScheme=mongoose.Schema({
    name:{type:Number,required:true},
    classes:[]
})

module.exports=mongoose.model('Academys',academyScheme)