// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Mock is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }

    function mintByETH(address _account, uint256 _eth) external {
        _mint(_account, _eth * 1 ether);
    }
}
