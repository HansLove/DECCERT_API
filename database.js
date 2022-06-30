const mongoose=require('mongoose')

const URI='mongodb://localhost/deccert'

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection
db.on('error',console.error.bind(console,'error en la conexion'))
db.once('open',function(){
    console.log("conectado a la base")
})

module.exports=mongoose