//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AirdropToken is ERC20 {
    constructor() ERC20("AirdropToken", "ATT") {
        _mint(msg.sender, 10 * 10**decimals());
    }
}
