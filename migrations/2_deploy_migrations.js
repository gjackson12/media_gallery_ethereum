var MediaGallery = artifacts.require("./MediaGallery");

var SampleLibraryContract = artifacts.require("./SampleLibraryContract");

module.exports = function(deployer) {
  deployer.deploy(MediaGallery);
  deployer.deploy(SampleLibraryContract);
};
