//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Airdrop {
    using SafeERC20 for IERC20;

    address public immutable token;
    
    mapping(address => bool) public claimed;

    event Claim(address indexed claimer);

    mapping (address => uint) public eligibleAddresses;

    constructor(address _token) {
        token = _token;
        eligibleAddresses[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266] = 10;
        eligibleAddresses[0x70997970C51812dc3A010C7d01b50e0d17dc79C8] = 20;
        eligibleAddresses[0x30AB0C3Da380FA87C4D679a8045E092915015074] = 30;
        eligibleAddresses[0x09635F643e140090A9A8Dcd712eD6285858ceBef] = 40;
        eligibleAddresses[0x09635F643e140090A9A8Dcd712eD6285858ceBef] = 50;
    }

    function claim() external {
        require(
            hasNotClaimed(msg.sender),
            "Airdrop: Address has already claimed!"
        );

        require(
            isEligible(msg.sender),
            "Airdrop: Address is not eligible for airdrop"
        );

        claimed[msg.sender] = true;

        IERC20(token).safeTransfer(msg.sender, eligibleAddresses[msg.sender] * 10**18);

        emit Claim(msg.sender);
    }

    function hasNotClaimed(address claimer)
        public
        view
        returns (bool)
    {
        return !claimed[claimer];
    }

    function isEligible(address claimer)
        public
        view
        returns (bool)
    {
        return eligibleAddresses[claimer] > 0;
    }

    function claimableAmount() public view returns(uint) {
        if (! hasNotClaimed(msg.sender)) {
            return 0;
        }

        if (! isEligible(msg.sender)) {
            return 0;
        }

        return eligibleAddresses[msg.sender];
    }
}
