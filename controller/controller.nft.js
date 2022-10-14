const sha256=require('crypto-js/sha256')
const Web3 =require( 'web3')
const DeccertJSON =require( '../build/Deccert.json')
const JSONServer =require( '../build/Server.json')
const Provider = require('@truffle/hdwallet-provider');

let modoGanache=false
let local_net="http://localhost:8545"
let binance_test_net='https://data-seed-prebsc-1-s1.binance.org:8545/'


control={}

const Participation='https://gateway.pinata.cloud/ipfs/QmUeR4fVw7TpGMgifYFQsxzp14XcZh1B37boFaaEunqZ4t'

const Answers=[
    {
        hash:"d04e455f28e6e31b49972bdbab170d9e2acd0ccb33e40b6074e017f7cebeb537",
        URI:"https://gateway.pinata.cloud/ipfs/QmZE73hPKskcvT5T4tpLV74a9rZaHgd5Lu1n1Xy8DncLjj"}
    
]

function pickNetwork(chain_id){

    if(chain_id=='0x539'){
        return local_net

    }else if(chain_id=='0x38'){
        //Binance Mainnet Smart Chain
        return binance_mainet
    }else if(chain_id=='0x61'){
        //Binance Testnet
        return binance_test_net

    }else if(chain_id=='0x13881'){
        //Mumbai poylgon Testnet
        return 'https://rpc-mumbai.matic.today'

    }else if(chain_id=='0x89'){
        //Polygon Mainnet
        return 'https://polygon-rpc.com/'

    }else if(chain_id=='0x3'){
        //Ropstein ETH Testnet
        return 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    }
}


const initDeccertContract=(chain_id)=>{
    //Aqui inicio y llamo la llave para firmar transacciones
    const pk = process.env.privateKey

        
    function determineContractAddress(){
        if(chain_id=='0x38'){
            //Binance smart chain
            return '0x75958BF6a69E4282941568d4722d83E428BE1089'
            
        }else if(chain_id=='0x61'){
            //Binance Testnet
            return "0xb86Cdc7e93F601D605FaFe6A3Eb5E42b82d5A97e"

        }else if(chain_id=='0x13881'){
            //mumbai poylgon testnet
            return '0x1B006d04bFc03e7Ab9ffc842e36d13dea4B229C1'
    
        }else if(chain_id=='0x89'){
            //Polygon mainnet
            return ''

        }else if(chain_id=='0x3'){
            //Ropstein 
            return '0x8C3032f5e868687b17c5cD1DbbEFc68d092c9bB2'
        }
    }   

    let provider = new Provider(
        pk, 
        pickNetwork(chain_id)
        );



    try {
        const web3 = new Web3(provider);
        // const id=await web3.eth.net.getId()
        // const deployedNetwork=DeccertJSON.networks[id]  

        const contrato=new web3.eth.Contract(
            DeccertJSON.abi,
            determineContractAddress()
            )
        return contrato
        
    } catch (error) {
        console.log("Error en proveedor nuevo contrato Deccert: ",error)
        return {}
    }
        
    
}

const iniciarContratoServidor=(chain_id)=>{

    const pk = process.env.privateKey    

    function determineContractAddress(){
        if(chain_id=='0x38'){
            //Binance smart chain
            return ''
        }else if(chain_id=='0x61'){
            //Binance Testnet
            return '0x76df5e63A3243B2621FC8b5284e639aE36D3E6Ce'

        }else if(chain_id=='0x13881'){
            //mumbai poylgon testnet
            return '0x4092f3e09EB821BFf6eBE11a2c773e275025A835'
    
        }else if(chain_id=='0x89'){
            //Polygon mainnet
            return ''
        }
    }


    try { 
    let provider = new Provider(
        pk, 
        pickNetwork(chain_id)
        );

        const web3 = new Web3(provider);

        const contrato=new web3.eth.Contract(
            JSONServer.abi,
            determineContractAddress()
            )
            
        return contrato
        
    } catch (error) {
        console.log("Error en Servidor smart contract: ",error)
        return {}
    }
        
    
}


control.SmartTest=async(req,res)=>{
    
    const public_key='0x988e6375bc6afAEa405A64aB482DBfbDbDB49038'
    const test_id=req.params.id
    const client_address=req.params.address
    const client_name=req.params.name
    const chain_id=req.params.chain

    // console.log('test id:', test_id, 'client address: ',client_address,"name: ",client_name,'chain id: ',chain_id)

    //Calculate the Hash of the answer
    var _hash=sha256(JSON.stringify(req.body)).toString()

    var respuesta=false

    const serverSmartContract =iniciarContratoServidor(chain_id)

    const deccertSmartContract =initDeccertContract(chain_id)

    // const receipt = await serverSmartContract.methods.checkPayment(client_address).call()
    
    //La respuesta es si, 
    if(_hash==Answers[test_id].hash
        // &&receipt[0]
        ){
        respuesta=true

        await deccertSmartContract.methods.ManualMinting(
            client_name,//Name
            Answers[test_id].URI,//uri
            client_address//receiver
    
        ).send({from:public_key})
    }

    res.json({
        "status":respuesta
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

module.exports=control;