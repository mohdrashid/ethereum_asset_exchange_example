var Web3 = require('web3');

const config = {
    host: 'localhost',
    port: 8545
};

module.exports = new Web3(new Web3.providers.HttpProvider('http://'+config.host+":"+config.port));
