var MediaGallery = artifacts.require("./MediaGallery");

var LibraryDemo = artifacts.require("./LibraryDemo");

module.exports = function(deployer) {
  deployer.deploy(MediaGallery);
  deployer.deploy(LibraryDemo);
};
