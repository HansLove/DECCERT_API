const mongoose=require('mongoose')

// const URI='mongodb://localhost/deccert'
const password=process.env.mongo
const URI=`mongodb+srv://Hans:${password}@clusteralfa.dscj2.mongodb.net/?retryWrites=true&w=majority`


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