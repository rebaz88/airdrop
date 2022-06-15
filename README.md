## Airdrop Example

This is and airdrop example using solidity

### Prerequist
* Clone this repo
* yarn
* Modify Airdrop.sol and include your desired address

### Build the contracts
in the root directory run
```bash
yarn build
```

this will build the artificats and generate contracts abi then run

```bash
yarn test
```

To test contracts


### Deploy(using hardhat)
npx hardhat run --network localhost scripts/deploy.ts

copy the contract addresses

### Running the dapp(dev)
```bash
cd ./app
```

copy the deployed contract address to .env file then

```bash
yarn
yarn dev
```

If you deploy the contract several times, you have to update the .env file and restart the dev server


