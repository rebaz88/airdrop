import Web3 from 'web3'

import attMeta from '../../artifacts/contracts/airdrop/Airdrop.sol/Airdrop.json'
import attToken from '../../artifacts/contracts/airdrop/AirdropToken.sol/AirdropToken.json'

const App = {
  web3: null,
  account: null,
  token: null,
  meta: null,

  start: async function () {
    const { web3 } = this

    try {
      this.token = new web3.eth.Contract(
        attToken.abi,
        '0xc351628EB244ec633d5f21fBD6621e1a683B1181'
      )

      this.meta = new web3.eth.Contract(
        attMeta.abi,
        '0xFD471836031dc5108809D173A067e8486B9047A3'
      )

      // get accounts
      const accounts = await web3.eth.getAccounts()
      this.account = accounts[0]
      this.refreshBalance()
      this.claimableAmount()
    } catch (error) {
      console.error('Could not connect to contract or chain.')
    }
  },

  refreshBalance: async function () {
    const { balanceOf } = this.token.methods
    const balance = await balanceOf(this.account).call()

    const balanceElement = document.getElementsByClassName('balance')[0]
    balanceElement.innerHTML = balance
  },

  claim: async function () {
    this.setStatus('Claiming... (please wait)')

    const { claim } = this.meta.methods

    try {
      await claim().send({ from: this.account })

      this.setStatus('Transaction complete!')
      this.refreshBalance()
      this.claimableAmount()
    } catch (e) {
      this.setStatus('Transaction failed!')
      console.error(e)
    }
  },

  claimableAmount: async function () {
    const { claimableAmount } = this.meta.methods

    try {
      const amount = await claimableAmount().call()
      this.setClaimableAmount(amount)
    } catch (e) {
      this.setStatus('Unable to fetch claimable amount!')
      console.error(e)
    }
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  setClaimableAmount: function (amount) {
    const status = document.getElementById('claimableAmount')

    if (amount > 0) {
      status.innerHTML = `Your claimable amount is <strong>${amount}</strong> ATT`
    } else {
      status.innerHTML = ''
    }
  }
}

window.App = App

window.addEventListener('load', function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum)
    window.ethereum.enable() // get permission to access accounts
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    )
  }

  App.start()
})
