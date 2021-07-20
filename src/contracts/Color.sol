// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is  ERC721Enumerable {
    uint dnaModulus = 10 * 6;
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "COLOR") {
    }
    
    function mint(string memory _color) public {
        require(!_colorExists[_color]);
        colors.push(_color);
        uint _id = colors.length;
        _mint(msg.sender, _id);
        _colorExists[_color] = true;
    }

    function breed (string memory _color1, string memory _color2) public {

    }
}