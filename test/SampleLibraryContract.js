var SampleLibraryContract = artifacts.require("./SampleLibraryContract.sol");

contract('SampleLibraryContract', (accounts) => {
    var sampleLibraryContractInstance;
    var num1 = 25000;
    var num2 = 50000;

    it('should return the larger number', () => {
        return SampleLibraryContract.deployed().then((instance) => {
            sampleLibraryContractInstance = instance;

            return sampleLibraryContractInstance.max(num1, num2);
        }).then((result) => {
            assert.equal(result.toNumber(), num2, "The larger number should be " + num2);
        });
    });

    it('should return the smaller number', () => {
        return SampleLibraryContract.deployed().then((instance) => {
            sampleLibraryContractInstance = instance;

            return sampleLibraryContractInstance.min(num1, num2);
        }).then((result) => {
            assert.equal(result.toNumber(), num1, "The smaller number should be " + num1);
        });
    });
});