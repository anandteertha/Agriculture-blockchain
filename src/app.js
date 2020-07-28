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




  renderTasks: async() => {
    const number_of_farmers = await App.agriculture.number_of_farmers()
    const current_account_number = await App.agriculture.current_account_id()
    const farmers = await App.agriculture.farmers_dict(current_account_number)
    const database = await App.agriculture.database_accounts(current_account_number)
    const adhar = farmers[1]
    const name = farmers[2]
    const state = farmers[7]
    const username = database[1]
    const info = farmers[4]
    const $create_an_account = $('.create_an_account')
    $create_an_account.find('.content1').html("NAME: "+name)
    $create_an_account.find('.content3').html("ADHAR NUMBER: "+adhar)
    $create_an_account.find('.content4').html("STATE: "+state)
    $create_an_account.find('.content2').html("USERNAME: "+username)
    $create_an_account.find('.content5').html("INFO: "+info)
  },


  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const agriculture = await $.getJSON('agriculture.json')
    App.contracts.agriculture = TruffleContract(agriculture)
    App.contracts.agriculture.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.agriculture = await App.contracts.agriculture.deployed()
  },

  createAccount: async() => {

    window.alert("inside createAccount()")

    var name = $('#name').val()
    var username = $('#username').val()
    var adhar = $('#adhar').val()
    var state = $('#state').val()
    //var address = $('address').val()
    var bankaccount = $('#bankaccount').val()
    var acreOfLand = $('#acreOfLand').val()
    var password = $('#password').val()
    await App.agriculture.createFarmerAccount(adhar,name,bankaccount,acreOfLand,state);

    //await App.agriculture.databaseAccount(username,password);

    window.alert("after calling the farmer function")
    window.reload()


  },

  databaseAccount: async() => {
    var username = $('#username').val()
    var password = $('#password').val()
    await App.agriculture.databaseAccount(username,password);

  },

  login: async() => {

    var username = $('#username').val()
    var password = $('#password').val()

    await App.agriculture.login(username,password)
    window.reload()


  }



}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
