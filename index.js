var fs = require('fs');
var web3 = require('./web3_client');
var metrics = require('./metrics');
var contracts = require('./contracts')

metrics(web3).then((val) => {
    console.log('Metrics');
    console.log(val);
});


fs.readFile('./contracts/sample/contract.sol', 'utf8', async function(err, contents) {
    const defaultAccount = await web3.eth.getCoinbase();
    const ContractObject = await contracts.deploy(web3, contents,'SimpleStorage',[1],defaultAccount);
    const result = await contracts.get(ContractObject,'get',null,defaultAccount);
    console.log(result)
    const result2 = await contracts.set(ContractObject,'set', 234,defaultAccount);
    if (result2) {
        const result = await contracts.get(ContractObject,'get', null,defaultAccount);
        console.log(result)
    }

});
