const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const morgan=require('morgan')
var cors = require('cors')
require('dotenv').config();


require('./database')

app.use(morgan('dev'))
app.use(cors())

app.set('port',process.env.PORT||5002)


const ruta_1=require('./routes/route.nft.js')
const ruta_user=require('./routes/route.user.js')


app.use(bodyParser.urlencoded({ extended: true, limit: '10000000mb'})); 
app.use(bodyParser.json());

// app.use(express.static('./lib/views/'));

app.use(express.json())

app.use('/nft',ruta_1)
app.use('/user',ruta_user)


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept,Authorization')

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.listen(app.get('port'),()=>{
    console.log("Server in Port: ",app.get('port'))
})