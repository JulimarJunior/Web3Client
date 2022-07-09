
class Web3Js {
    constructor() {
        this.web3 = new Web3(Web3.givenProvider);
        this.account = false;
    }
    
    error(msg) {
        let errors = {
            4001: "Transação negada pelo usuário"
        };
        
        return {
            error: msg.code ? errors[msg.code] : msg
        }
    }
    
    connect() {
        return new Promise(async(resolve) => {
            await this.web3.eth.requestAccounts()
            .catch((err) => {
                resolve(this.error(err));
            })
            .then((accounts) => {
                if(accounts) {
                    this.account = accounts[0];
                    resolve(this.account);
                }
            })
        })
    }
    
    changeAccount(callback) {
        ethereum.on('accountsChanged', function (accounts) {
            callback();
        })
    }
    
    changeChain(callback) {
        ethereum.on('chainChanged', function (accounts) {
            callback();
        })
    }
    
    getBalance(address) {
        return new Promise(async(resolve) => {
            await this.web3.eth.getBalance(address)
            .then((balance) => {
                resolve({
                    wei: balance,
                    number: this.web3.utils.fromWei(balance)
                })
            })
            .catch((err) => {
                resolve(this.error(err));
            })
        })
    }
    
    getChainId() {
        return new Promise(async(resolve) => {
            await this.web3.eth.getChainId()
            .then((chain) => {
                resolve(chain);
            })
            .catch((err) => {
                resolve(this.error(err));
            })
        })
    }
    
    sendTransaction(from, to, value) {
        return new Promise(async(resolve) => {
            await this.web3.eth.sendTransaction({
                from: from,
                to: to,
                value: this.web3.utils.toWei(value)
            })
            .on('transactionHash', hash => {
                resolve(hash);
            })
            .on('error', err => {
                resolve(this.error(err));
            })
            .catch((err) => {
                resolve(this.error(err.message));
            })
        })
    }
    
    async getAccount() {
        let accounts = await this.web3.eth.getAccounts();
        
        return accounts[0];
    }
    
    async teste() {
        return new Promise(async(resolve) => {
            let fromAddress = "0x23cc8E05cc64dB6e654c6329aF7aa0fE47Bf6D98";
            let contractAddress = "0x287Db351d5230716246CfB46AF8153025eDa6A0a";
            let contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"PancakePair","outputs":[{"internalType":"contract IPancakePair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PancakeRouter","outputs":[{"internalType":"contract IPancakeRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PreSale","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PrivateSale","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activateFeesOnTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deactivateFeesOnTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"setOperationsVaultAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"}],"name":"setPairAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"preSale","type":"address"}],"name":"setPreSaleAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"privateSale","type":"address"}],"name":"setPrivateSaleAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"setRewardsVaultAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"}],"name":"setRouterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"threshold","type":"uint256"}],"name":"setSwapThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

            let contract = new this.web3.eth.Contract(contractABI, contractAddress, {
                from: fromAddress
            });

            // console.log(contract.methods);
            console.log(contract.methods.transfer('0xB2Fcd1377CDd69384509dCf31Cbb2A9f813FA883', '1').send());
        })
    }
}

// function verify() {
//     if(typeof window.ethereum !== 'undefined') {
//         // Tem instalado
//     } else {
//         // Nao tem instalado
//     }
// }