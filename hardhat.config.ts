import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@openzeppelin/hardhat-upgrades'

import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'

dotenv.config()

const config: HardhatUserConfig = {
  defaultNetwork: 'rinkeby',

  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [
        'a5aa7f599f2317ef1aba5838d45537e6e3c2197a88c0874bc8ed6f23a0c54805'
      ]
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/1i2sN6u46AySlE5O47FMYt8kyPYwmWJJ',
      accounts: [
        'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
      ]
    }
  },
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD'
  }
}

export default config
