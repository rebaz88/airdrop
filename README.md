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

to build the artificats and generate contracts abi

```bash
yarn test
```

To test contracts


### Deploy(using hardhat)
npx hardhat run --network localhost scripts/deploy.ts

### Running the dapp(dev)
```bash
cd ./app
yarn
yarn dev
```


