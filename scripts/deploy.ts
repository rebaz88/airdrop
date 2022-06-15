import { parseEther } from 'ethers/lib/utils'
import { ethers } from 'hardhat'

import { Airdrop__factory, AirdropToken__factory } from '../typechain-types'

async function main() {
  const [deployer] = await ethers.getSigners()

  // We get the contract to deploy
  const token = await new AirdropToken__factory(deployer).deploy()
  await token.deployed()

  const airdrop = await new Airdrop__factory(deployer).deploy(token.address)
  await airdrop.deployed()

  console.log('Token deployed to:', token.address)
  console.log('Airdrop deployed to:', airdrop.address)

  await token.transfer(airdrop.address, parseEther('10'))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
