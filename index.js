var fs = require('fs');
var web3 = require('./web3_client');
var metrics = require('./metrics');
var contracts = require('./contracts')

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
    let file1 = await readFile('./contracts/sample/Administered.sol');
    const defaultAccount = await web3.eth.getCoinbase();
    const ContractObject = await contracts.deploy(web3, file1,'Administered',[],defaultAccount);
    /*const result = await contracts.get(ContractObject,'get',[],defaultAccount);
    console.log(result)
    const result2 = await contracts.set(ContractObject,'set', [134],defaultAccount);
    if (result2) {
        const result = await contracts.get(ContractObject,'get',[],defaultAccount);
        console.log(result)
    }*/
}


deploy();