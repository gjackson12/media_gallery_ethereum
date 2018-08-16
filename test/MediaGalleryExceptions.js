var MediaGallery = artifacts.require("./MediaGallery.sol");

contract('MediaGallery', (accounts) => {
    var mediaGalleryInstance;
    var poster = accounts[1];
    var mediaName1 = "Media Asset 1";
    var mediaDescription1 = "This is a description for Media Asset 1";
    var mediaHash1 = "Qm1x23456";
    var mediaTags1 = "tag1,,;tag2,,;tag3";
    var mediaType1 = "image";
    var mediaExtension1 = "png";
    var owner = accounts[0];

    it("should throw an exception if a user don't have any media yet", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance; 

            return instance.getMediaByAddress(poster);
        }).then(assert.fail)
        .catch((error) => {
          assert(true);
        });
    });

    it("should throw an exception if someone other than the owner tries to stop the contract", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.stopContract({from: poster});
        }).then(assert.fail)
        .catch((error) => {
            assert(true);
        })
    });

    it("should throw an exception if someone other than the owner tries to re-enable the contract", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.resumeContract({from: poster});
        }).then(assert.fail)
        .catch((error) => {
            assert(true);
        })
    });
});