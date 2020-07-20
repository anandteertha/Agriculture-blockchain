App = {

  contracts: {},

  load: async() => {

		await App.loadWeb3()
		await App.loadAccount()
		await App.loadContract()
    await App.renderTasks()


		},

    loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
      window.alert("connected to Metamask!!!")
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()




        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      //amount_balance = web3.currentProvider.value;
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  web3.eth.getCoinbase(function(err, org_address) {
  if (err === null) {
  web3.eth.getBalance(App.account, function(err, balance) {
    if (err === null) {
        App.balance = web3.fromWei(balance, "ether")
    }
  });
  }
  });




  },


  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const charity = await $.getJSON('charity.json')
    App.contracts.charity = TruffleContract(charity)
    App.contracts.charity.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.charity = await App.contracts.charity.deployed()
  },


}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
