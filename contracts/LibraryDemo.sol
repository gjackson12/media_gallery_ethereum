pragma solidity 0.4.24;

// import Open Zeppelin library for simple Math operations
import "../node_modules/openzeppelin-solidity/contracts/math/Math.sol";

/// @title Library Demo, demonstration of how to use a library
/// @author Graham Jackson
//Date: 27 August 2018
//Version: LibraryDemo v1.0 Local
/**
    @dev This contract demonstrates how to use a library within a Solidity
    contract.
*/
contract LibraryDemo {
    address public owner; // Address that created/deployed this contract

    constructor() public {
        owner = msg.sender;
    }

    /** 
      * @dev Determines which number is larger, provided two numbers are supplied.
      * @param _num1 The first number to compare.
      * @param _num2 A second number to compare.
    */
    function max(uint256 _num1, uint256 _num2) public pure returns(uint256) {
        return Math.max256(_num1, _num2);
    }

    /** 
      * @dev Determines which number is smaller, provided two numbers are supplied.
      * @param _num1 The first number to compare.
      * @param _num2 A second number to compare.
    */
    function min(uint256 _num1, uint256 _num2) public pure returns(uint256) {
        return Math.min256(_num1, _num2);
    }
}