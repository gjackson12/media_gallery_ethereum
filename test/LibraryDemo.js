var LibraryDemo = artifacts.require("./LibraryDemo.sol");

contract('LibraryDemo', (accounts) => {
    var libraryDemoInstance;
    var num1 = 25000;
    var num2 = 50000;
    var _owner = web3.eth.accounts[0];

    it('should initialize with the correct owner', () => {
        return LibraryDemo.deployed().then((instance) => {
            libraryDemoInstance = instance;

            return libraryDemoInstance.owner();
        }).then((owner) => {
            assert.equal(owner, _owner, "The owner should be " + _owner);
        });
    });

    it('should return the larger number', () => {
        return LibraryDemo.deployed().then((instance) => {
            libraryDemoInstance = instance;

            return libraryDemoInstance.max(num1, num2);
        }).then((result) => {
            assert.equal(result.toNumber(), num2, "The larger number should be " + num2);
        });
    });

    it('should return the smaller number', () => {
        return LibraryDemo.deployed().then((instance) => {
            libraryDemoInstance = instance;

            return libraryDemoInstance.min(num1, num2);
        }).then((result) => {
            assert.equal(result.toNumber(), num1, "The smaller number should be " + num1);
        });
    });
});