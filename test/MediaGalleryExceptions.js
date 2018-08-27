var MediaGallery = artifacts.require("./MediaGallery.sol");

/** 
  * Tests scenarios where exceptions should occur for the Media Gallery contract.I have supplied a brief comment/description 
  * below for each test ncluded to provide context and justification.
*/
contract('MediaGallery', (accounts) => {
    var mediaGalleryInstance;
    var poster = accounts[1];
    var mediaName1 = "Media Asset 1";
    var mediaDescription1 = "This is a description for Media Asset 1";
    var mediaHash1 = "Qm1x23456";
    var mediaTags1 = "tag1,,;tag2,,;tag3";
    var mediaType1 = "image";
    var mediaExtension1 = "png";
    var invalidName = "FShgZuvzjZbbCBqLNuDJtwKtSRkdqWcUUfAjawFXTBBpaTqrhdff";
    var invalidDesc = "zQjLKzVYkTbLCRuKvERcmNLAMfYyVNKJSShkGWdjXEHALbbXcFReehQuCdvBDHPEyLuuYphrrnchifujt" + 
    "QpembkFuPzQjLKzVYkTbLCRuKvERcmNLAMfYyVNKJSShkGWdjXEHALbbXcFReehQuCdvBDHPEyLuuYphrrnchifujtQpembkFuPrg";
    var invalidTags = "ZyhByPGmgTeKBmLwMDfRWHNPYnUGdjEQNJKFEcrJWTVLCWiEKgkTPZJPBzmVrbvrRaCuqRYFVjig";
    var invalidHash = "Uusz8nU1MY0rbsLadys5Ug5xIoU0fsa4UEThaYFRxEpCczx";

    // This test verifies that if someone other than the owner tries to stop the contract, an error is thrown.
    it("should throw an exception if someone other than the owner tries to stop the contract", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.stopContract({from: poster});
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

    // This test verifies that if someone other than the owner tries to re-enable the contract, an error is thrown.
    it("should throw an exception if someone other than the owner tries to re-enable the contract", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.resumeContract({from: poster});
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

    /**
     * This test verifies that if a name is provided for a media asset that is longer than 125 characters long, an
     * error is thrown.
    */
    it("should throw an exception if the media name submitted is too long", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.addMedia(
              invalidName,
              mediaDescription1,
              mediaHash1,
              mediaTags1,
              mediaType1,
              mediaExtension1,
              {from: poster}
            );
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

    /**
     * This test verifies that if a description is provided for a media asset that is longer than 250 characters long,
     * an error is thrown.
    */
    it("should throw an exception if the media description submitted is too long", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.addMedia(
              mediaName1,
              invalidDesc,
              mediaHash1,
              mediaTags1,
              mediaType1,
              mediaExtension1,
              {from: poster}
            );
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

    /**
     * This test verifies that if the media tags provided for a media asset is longer than 150 characters long,
     * an error is thrown.
    */
    it("should throw an exception if the media tags submitted is too long", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.addMedia(
              mediaName1,
              mediaDescription1,
              mediaHash1,
              invalidTags,
              mediaType1,
              mediaExtension1,
              {from: poster}
            );
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

    /**
     * This test verifies that if a hash is provided for a media asset that is not equal to 46 characters,
     * an error is thrown.
    */
    it("should throw an exception if the media hash submitted is not a valid length", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.addMedia(
              mediaName1,
              mediaDescription1,
              invalidHash,
              mediaTags1,
              mediaType1,
              mediaExtension1,
              {from: poster}
            );
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });
});