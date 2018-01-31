module.exports = function getMetrics(web3){
    let metrics = {};
    return new Promise (async (resolve, reject) => {
        try {
            metrics['networkID'] = await web3.eth.net.getId();
            metrics['peers'] = await web3.eth.net.getPeerCount();
            metrics['blockNumber'] = await web3.eth.getBlockNumber();
            metrics['compilers'] = await web3.eth.getCompilers();
            metrics['mining'] = await web3.eth.isMining();
            metrics['hashRate'] = await web3.eth.getHashrate();
            metrics['gasPrice'] = await web3.eth.getGasPrice();
            metrics['protocolVersion'] = await web3.eth.getProtocolVersion();
        } catch (err){
            reject(err);
        }
        resolve(metrics);
    });
}
