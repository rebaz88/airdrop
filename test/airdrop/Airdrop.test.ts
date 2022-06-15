import { expect } from 'chai'
import { parseEther } from 'ethers/lib/utils'
import { ethers } from 'hardhat'

import { Airdrop__factory, AirdropToken__factory } from '../../typechain-types'

describe('Airdrop', () => {
  it('Full Cycle', async () => {
    const [signer, unEligible] = await ethers.getSigners()

    const token = await new AirdropToken__factory(signer).deploy()

    const airdrop = await new Airdrop__factory(signer).deploy(token.address)

    await token.transfer(airdrop.address, parseEther('10'))

    expect(await airdrop.claimed(signer.address)).to.eq(false)

    expect(await airdrop.hasNotClaimed(signer.address)).to.eq(true)
    expect(await airdrop.isEligible(signer.address)).to.eq(true)

    await expect(() => airdrop.claim()).to.changeTokenBalances(
      token,
      [airdrop, signer],
      [-10, 10]
    )

    expect(await airdrop.claimed(signer.address)).to.eq(true)
    expect(await airdrop.hasNotClaimed(signer.address)).to.eq(false)

    await expect(airdrop.claim()).to.be.revertedWith(
      'Airdrop: Address has already claimed!'
    )

    await expect(airdrop.connect(unEligible).claim()).to.be.revertedWith(
      'Airdrop: Address is not eligible for airdrop'
    )

    expect(await airdrop.claimed(unEligible.address)).to.eq(false)

    expect(await airdrop.isEligible(unEligible.address)).to.eq(false)
  })
})
