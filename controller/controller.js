const sha256=require('crypto-js/sha256')
const Web3 =require( 'web3')
const DeccertJSON =require( '../build/Deccert.json')
const Provider = require('@truffle/hdwallet-provider');



let modoGanache=true
let local_net="http://localhost:8545"
let binance_test_net='https://data-seed-prebsc-1-s1.binance.org:8545/'


control={}

const Answers=[
    {hash:"d04e455f28e6e31b49972bdbab170d9e2acd0ccb33e40b6074e017f7cebeb537",
    URI:"https://gateway.pinata.cloud/ipfs/QmZE73hPKskcvT5T4tpLV74a9rZaHgd5Lu1n1Xy8DncLjj"}
    
]

const initDeccertContract=async(req,res)=>{
    //Aqui inicio y llamo la llave para firmar transacciones
    const pk = process.env.privateKey

    //Networks
    const address_binance_testnet='0x86228118158D0EFEc336eB1a6f24dBC7C5b7218A'
        
   
    let provider = new Provider(
        pk, 
        modoGanache?local_net:binance_test_net
        );



    try {
        const web3 = new Web3(provider);
        const id=await web3.eth.net.getId()
        const deployedNetwork=DeccertJSON.networks[id]  

        const contrato=new web3.eth.Contract(
            DeccertJSON.abi,
            modoGanache?deployedNetwork.address:address_binance_testnet
            )
        return contrato
        
    } catch (error) {
        console.log("Error en proveedor nuevo contrato Deccert: ",error)
        return {}
    }
        
    
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


control.SmartTest=async(req,res)=>{
    
    const public_key='0x63710f05aDEa06dE5100F2721Ddeed4cF2C697BC'
    const test_id=req.params.id
    const client_address=req.params.address
    const client_name=req.params.name



    //Calculate the Hash of the answer
    var _hash=sha256(JSON.stringify(req.body)).toString()

    console.log('hash: ',_hash)
    // console.log('body: ',req.body)
    var respuesta=false

    if(_hash==Answers[test_id].hash){
        respuesta=true
        const deccertSmartContract = await initDeccertContract()

        await deccertSmartContract.methods.ManualMinting(
            client_name,//Name
            Answers[test_id].URI,//uri
            client_address//receiver
    
        ).send({from:public_key})
    }

    res.json({
        "status":respuesta
    })

    // await nuevo.save()
    // .then(docs=>{
    //     res.json({
    //         "data":docs
    //     })
    // })
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