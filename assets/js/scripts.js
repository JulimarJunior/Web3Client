let web3js = new Web3Js();

let chains = {
    1: {
        name: 'Ethereum MainNet',
        icon: 'https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_ethereum.jpg&w=32&q=75',
        symbol: 'ETH'
    },
    56: {
        name: 'Binance Smart Chain Mainnet',
        icon: 'https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_binance.jpg&w=32&q=75',
        symbol: 'BNB'
    },
    97: {
        name: 'Binance Smart Chain Testnet',
        icon: 'https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_binance.jpg&w=32&q=75',
        symbol: 'TBNB'
    },
    137: {
        name: 'Polygon Mainnet',
        icon: 'https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_polygon.jpg&w=32&q=75',
        symbol: 'MATIC'
    }
}

$('.btn.connect-wallet').click(async () => {
    let account = await web3js.connect();

    if(account.error) {
        newAlert(account.error);
        return;
    }

    $('.btn.connect-wallet').hide();
    $('.account').removeClass('d-none');
    $('.actions').removeClass('d-none');

    setAccount();

    web3js.changeAccount(() => {
        setAccount();
    })

    web3js.changeChain(() => {
        setAccount();
    })
})

$('#form-sendTransaction').submit(async () => {
    let form = serialize('#form-sendTransaction');

    let account = await web3js.getAccount();

    if(account === form.to) {
        newAlert("Destinatário não pode ser a própria conta");
        return;
    }

    let balance = await web3js.getBalance(account);
    if(form.value > balance.number) {
        newAlert("Saldo insulficiente");
        return;
    }

    let transaction = await web3js.sendTransaction(account, form.to, form.value);
    if(transaction.error) {
        newAlert(transaction.error);
        return;
    }

    newAlert(`Transação <b>${transaction}</b> enviada`, 'success');
    $('.modal#sendTransaction').modal('hide'); 
}).validate({
    rules: {
        to: {
            required: true
        },
        value: {
            required: true,
            min: 0,
            number: true
        }
    },
    messages: {
        to: {
            required: 'Endereço destino obrigatório'
        },
        value: {
            required: 'Valor obrigatório',
            min: 'Valor inválido',
            number: 'Valor inválido'
        }
    },
    submitHandler: () => {
        $(this).submit()
    }
})

async function setAccount() {
    let account = await web3js.getAccount();
    $('.account h6').text(account);

    let chain   = await web3js.getChainId();
    chain = chains[chain];
    if(chain) {
        $('.chain img').attr('src', chain.icon);
        $('.chain small').text(`${chain.name} (${chain.symbol})`);
    } else {
        $('.chain img').removeAttr('src');
        $('.chain small').text("Rede desconhecida");
    }

    setBalance();
}

async function setBalance() {
    $('#viewBalance .balance').text('Carregando...');

    let balance = await web3js.getBalance(await web3js.getAccount());

    if(balance.error) {
        newAlert(balance.error);
        return;
    }

    let symbol = chains[await web3js.getChainId()].symbol;

    $('#viewBalance .balance').html(`${balance.number} ${symbol}<br><small class="text-secondary">${balance.wei} wei</small>`);
}

function newAlert(msg, type = 'danger') {
    $('.alert').removeClass('alert-danger alert-success').addClass(`alert-${type}`).hide().fadeIn().html(msg);

    setTimeout(() => {
        $('.alert').fadeOut();
    }, 5000)
}

function serialize(form) {
    let inputs = {};

    $(form).serializeArray().forEach((input) => {
        inputs[input.name] = input.value;
    })

    return inputs;
}

async function teste() {
    console.log(await web3js.teste());
}