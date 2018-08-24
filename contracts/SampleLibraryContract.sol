pragma solidity 0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/math/Math.sol";

contract SampleLibraryContract {
    function max(uint256 _num1, uint256 _num2) public pure returns(uint256) {
        return Math.max256(_num1, _num2);
    }

    function min(uint256 _num1, uint256 _num2) public pure returns(uint256) {
        return Math.min256(_num1, _num2);
    }
}