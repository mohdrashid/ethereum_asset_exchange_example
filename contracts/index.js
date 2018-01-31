const solc = require('solc');
module.exports = {
    compile: function(web3, source) {
        return solc.compile(source, 1);
    },
    instance: function(web3, source, instanceName) {
        const compiled = this.compile(web3, source)['contracts']
        const compiledInstance = compiled[':'+instanceName];
        const abi2 = JSON.parse(compiledInstance['interface']);
        return {
            instance: new web3.eth.Contract(abi2),
            code: compiledInstance['bytecode']
        }
    },
    deploy: function(web3, source, name, args, from){
        return new Promise((resolve,reject) => {
            const ContractObject = this.instance(web3, source, name);
            const ContractCode = ContractObject['code'];
            let ContractInstance = ContractObject['instance'];
            ContractInstance.deploy({
                data: ContractCode,
                arguments: args
            }).send({
                from: from,
                gas: 4712388,
                gasPrice: 100000000000
            }, (error, transactionHash) => {  })
            .on('error', (error) => reject)
            .on('confirmation', (confirmationNumber, receipt) => { 
                ContractInstance.options.address = receipt.contractAddress;
               resolve(ContractInstance);
             });
        });
    },
    get: async function(instance,functionName,args,from){
        return await instance.methods[functionName].apply(null, args).call({from: from});
    },
    set: async function(instance,functionName,args,from){
        return new Promise((resolve,reject)=>{
            (args ? instance.methods[functionName].apply(null,args).send({from: from}) : instance.methods[functionName]().send({from: from}))
            .on('confirmation', (confirmationNumber, receipt) => { 
                resolve(true);
             })
             .on('error', reject)
        })
    }
};


    