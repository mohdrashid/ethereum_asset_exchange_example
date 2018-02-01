var fs = require('fs');
var web3 = require('./web3_client');
var metrics = require('./metrics');
var Contract3 = require('contract3');
var contract3 = new Contract3(web3);

metrics(web3).then((val) => {
    console.log('Metrics');
    console.log(val);
});

function readFile(address){
    return new Promise((resolve,reject)=>{
        fs.readFile(address, 'utf8', (err, contents) => {
            if(err){reject(err)} else{
                resolve(contents)
            }
        })
    })
}

async function deploy(){
    let Administered = await readFile('./sample/Administered.sol');
    let Asset = await readFile('./sample/Asset.sol');

    let input = {
        'Administered.sol': Administered,
        'Asset.sol': Asset
    }
    const defaultAccount = await web3.eth.getCoinbase();
    const contractInstances = await contract3.getInstances(input);
    const AssetInstance = contractInstances['Asset'];
    try{
        const ContractObject = await AssetInstance.deployContract(
            //args to constuctor
            ["computerSystem",defaultAccount,100],
            //deployer
            defaultAccount, 
            //Ether to send
            0, 
            //Other Parameters
            {
                gas:4712388
            });
        console.log('Contract Address:',ContractObject.options.address)
        const result = await AssetInstance.get('getValue',[],defaultAccount);
        console.log('Value of Asset:', result)
        console.log('Changing Asset Value')
        const result2 = await AssetInstance.set('changeValue', [134],defaultAccount);
        if (result2) {
            const result = await AssetInstance.get('getValue',[],defaultAccount);
            console.log('New Asset Value:', result)
        }
    } catch(e){
        console.log(e)
    }

}


deploy();