const Certificado=require('../models/model.certificado')
// const sha256=require('crypto-js/sha256')
const Web3 =require( 'web3')
const DeccertJSON =require( '../build/Deccert.json')
const Provider = require('@truffle/hdwallet-provider');
// const HDWalletProvider = require("@truffle/hdwallet-provider");
const address = '';
const privateKey = '';
const infuraUrl = ''; 

const web3 = new Web3("http://localhost:8545"||Web3.givenProvider)


control={}

control.funcionCool=async(req,res)=>{
    
    var _cuenta=req.params.account
    var _balance=0
    try {
    const id=await web3.eth.net.getId()
    const deployedNetwork=DeccertJSON.networks[id]
    
    const contrato=new web3.eth.Contract(
        DeccertJSON.abi,
        deployedNetwork.address
        )
        console.log('contrato: ',contrato._address)

        _balance=await contrato.methods.get(1).call()
        
    } catch (error) {
        console.log("Error en proveedor nuevo contrato hash: ",error)
    }
        
    res.status(200).json({
        "data":'sa',
        "balance":_balance
    })
}

control.firmarCertificado=async(req,res)=>{
    const nft_id=req.params.id
    
    // const provider = new Provider(privateKey, 'https://rinkeby.infura.io/v3/74aa9a15e2524f6980edb8a377301f3c'); 

    const pk = process.env.privateKey

    const public_key2='0x63710f05aDEa06dE5100F2721Ddeed4cF2C697BC'
    let provider = new Provider(pk, "http://localhost:8545");

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
      DeccertJSON.abi,
      DeccertJSON.networks[networkId].address
    );
    console.log('contrato: ',myContract._address)


    const receipt = await myContract.methods.signNFT(1).send({ from: public_key2 });
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    res.status(200).json({
        "data":receipt
       
    })

  }


control.nuevaAcademia=async(req,res)=>{
    var _hash=sha256(req.body+req.body.name).toString()
    var _obj=Object.assign(req.body, {hash:_hash});
    const nuevo=new Insumo(_obj)
    
    await nuevo.save()
    .then(docs=>{
        res.json({
            "data":docs
        })
    })
}

control.login=async(req,res)=>{

    try {
        const {name,password}=req.body
        console.log('name:' ,name, 'password; ',password)

        const userData=await user.findOne({name:name})
        const password_hash=userData.password
        
        bcrypt.compare(password, password_hash, function(err, result) {

        const token=jwt.sign({id:userData._id,name:userData.name},
            process.env.JWT)

        res.json({
            respuesta:result,
            status:true,
            token:token})
        });

    } catch (error) {
        console.log('error==> ',error)
        res.json({status:false,respuesta:false})
    }



}

control.firmarLista=async(req,res)=>{

    try {
        const {lista}=req.body
        lista.forEach(element => {
            
        });
        res.json({
            status:true})
      

    } catch (error) {
        console.log('error==> ',error)
        res.json({status:false,respuesta:false})
    }



}

module.exports=control;