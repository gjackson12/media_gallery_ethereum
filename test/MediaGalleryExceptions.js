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
    var invalidName = "30rJKcVF2e15Bbo24Qp0JAmOA9zMjg6I76m3NhgCeqwORnBodGHMGtGK" + 
    "KtoRFzqly7gWYRLjKkv037sp3X0lBKu5m2D78FnSTN9Rh6IqhMnG5uMqr0JbWbeaDmv6P6s9qa36a4wh4q3L4qQ6LOAutKI";
    var invalidDesc = "37d5ouTdD3v8Hzwg71Z5nTtGkwrvgrEAQTFLNiBTMy1sHuEMoKAxdY667a9sXCXQpVxjnTtwbeZ0k" + 
    "VKtOPZXkhnvDZimaINnJD38qX1F0PkUMXUPm1WMHtxWLdeVh2JClEPyFJkeLkp2V" + 
    "Q0ImeWBiAtFuHPIPKM50SV5xhbyLIzOzXrcXeXiEUc45RAueM7GnyeinwYbnuzyEPh5Najsog7" + 
    "4K4lSOYYIExkTwWdXyCq3Y6spPy7iCAKlWq2";
    var invalidTags = "NViPFmcshbGAnPlyj6vD7DkeKY4VLutq0SNY8zkofOuvZl662mDcW8dPsGez9rLcmCNpx5AnO8niXBgy" +
    "zXJGOenfbToAdG3RWxV26mMRBoaMGNtWFW1p9pDPEiQYW6CQylDLr5qFvYDZFQUWs1QNZkS";
    var invalidHash = "Uusz8nU1MY0rbsLadys5Ug5xIoU0fsa4UEThaYFRxEpCczx";

    it("should throw an exception if a user don't have any media yet", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance; 

            return instance.getMediaByAddress(poster);
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

    it("should throw an exception if someone other than the owner tries to stop the contract", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.stopContract({from: poster});
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

    it("should throw an exception if someone other than the owner tries to re-enable the contract", () => {
        return MediaGallery.deployed().then((instance) => {
            mediaGalleryInstance = instance;

            return mediaGalleryInstance.resumeContract({from: poster});
        }).then(assert.fail)
        .catch((error) => {
            assert.include(error.message, "revert", "The error message should contain 'revert'");
        });
    });

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