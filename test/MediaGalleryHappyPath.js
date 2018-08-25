var MediaGallery = artifacts.require("./MediaGallery.sol");
/** 
 * Tests the 'happy path' for the Media Gallery contract. Happy path in this case means testing the default scenario
 * where no exceptions or error conditions occur. I have supplied a brief comment/description below for each test
 * included to provide context and justification.
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
  var owner = accounts[0];

  // The purpose of this test is to ensure the contract is iniitalized with the appropriate values...
  it("should be initialized with empty values", () => {
    return MediaGallery.deployed().then((instance) => {
      mediaGalleryInstance = instance;

      return mediaGalleryInstance.mediaCounter();
    }).then((count) => {
      assert.equal(count.toNumber(), 0, "number of media assets should be zero");

      return mediaGalleryInstance.isStopped();
    }).then((state) => {
      assert.isFalse(state, "the contract must not be stopped");
    })
  });

  /**
   * This test is testing the ability to add a new media asset. Checks within this test include ensuring an event is emitted,
   * log values are accurate, the number of media assets has increased by one, and that the data in the struct representing
   * the media has been defined accurately.
  */
  it("should let us add a media asset", () => {
    return MediaGallery.deployed().then((instance) => {
      mediaGalleryInstance = instance;

      return mediaGalleryInstance.addMedia(
        mediaName1,
        mediaDescription1,
        mediaHash1,
        mediaTags1,
        mediaType1,
        mediaExtension1,
        {from: poster}
      );
    }).then((receipt) => {
      // check event log
      assert.equal(receipt.logs.length, 1, "one event should have been triggered");
      assert.equal(receipt.logs[0].event, "LogNewMediaAsset", "event should be LogNewMediaAsset");
      assert.equal(receipt.logs[0].args._id.toNumber(), 0, "id must be 0");
      assert.equal(receipt.logs[0].args._name, mediaName1, "event name must be " + mediaName1);
      assert.equal(receipt.logs[0].args._author, poster, "event author must be " + poster);
      assert.equal(receipt.logs[0].args._mediaHash, mediaHash1, "event media hash must be " + mediaHash1);
      assert.equal(receipt.logs[0].args._mediaType, mediaType1, "event media type must be " + mediaType1);

      return mediaGalleryInstance.mediaCounter();
    }).then((count) => {
      // check count of total media assets
      assert.equal(count, 1, "number of media assets must be 1");

      return mediaGalleryInstance.mediaDatabase(poster, 0);
    }).then((data) => {
      // check that media asset data is stored
      assert.equal(data[0].toNumber(), 0, "media id must be 0");
      assert.equal(data[1], mediaName1, "media name must be " + mediaName1);
      assert.equal(data[2], mediaDescription1, "media name must be " + mediaDescription1);
      assert.equal(data[3], poster, "media author must be " + poster);
      assert.equal(data[5], mediaTags1, "media tags must be " + mediaTags1);
      assert.equal(data[6], mediaHash1, "media hash must be " + mediaHash1);
      assert.equal(data[7], mediaType1, "media type must be " + mediaType1);
      assert.equal(data[8], mediaExtension1, "media extension must be " + mediaExtension1);
    });
  });

  /**
   * This test validates that we can retrieve the number of media assets that have been added by a particular address. This
   * function is critical for the application's ability to retrieve media asssets. 
  */
  it("should return the number of media assets posted by a given address", () => {
    return MediaGallery.deployed().then((instance) => {
      mediaGalleryInstance = instance;

      return mediaGalleryInstance.getNumberMediaByAddress(poster);
    }).then((data) => {
      assert.equal(data.toNumber(), 1, "number of media assets shoud be " + data);
    })
  });

  /**
   * The purpose of this test is to verify the ability to stop the AddMedia function on the Media Gallery contract.
   * This is verified by executing the stopContract function, and attempting to add a new media asset, and ensuring
   * an error is thrown.
  */
  it("should stop the contract by not allowing new media", () => {
    return MediaGallery.deployed().then((instance) => {
      mediaGalleryInstance = instance;

      return mediaGalleryInstance.stopContract({from: owner});
    }).then(() => {
      return mediaGalleryInstance.isStopped();
    }).then((state) => {
      assert.isTrue(state, "The isStopped state var is true");

      return mediaGalleryInstance.addMedia(
        mediaName1,
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
   * The purpose of this test is to verify the ability to resume the contract. This is verified by executing the
   * resumeContract function, attempting to add a new media asset, ensuring a new event is emitted for a new media
   * asset, and that the new struct representing the media asset has accurate data.
  */
  it("should re-enable the contract by allowing new media", () => {
    return MediaGallery.deployed().then((instance) => {
      mediaGalleryInstance = instance;

      return mediaGalleryInstance.resumeContract({from: owner});
    }).then(() => {
      return mediaGalleryInstance.isStopped();
    }).then((state) => {
      assert.isFalse(state, "The isStopped state var is false");

      return mediaGalleryInstance.addMedia(
        mediaName1,
        mediaDescription1,
        mediaHash1,
        mediaTags1,
        mediaType1,
        mediaExtension1,
        {from: poster}
      );
    }).then((receipt) => {
      // check event log
      assert.equal(receipt.logs.length, 1, "one event should have been triggered");
      assert.equal(receipt.logs[0].event, "LogNewMediaAsset", "event should be LogNewMediaAsset");
      assert.equal(receipt.logs[0].args._id.toNumber(), 1, "id must be 1");
      assert.equal(receipt.logs[0].args._name, mediaName1, "event name must be " + mediaName1);
      assert.equal(receipt.logs[0].args._author, poster, "event author must be " + poster);
      assert.equal(receipt.logs[0].args._mediaHash, mediaHash1, "event media hash must be " + mediaHash1);
      assert.equal(receipt.logs[0].args._mediaType, mediaType1, "event media type must be " + mediaType1);

      return mediaGalleryInstance.mediaDatabase(poster, 1);
    }).then((data) => {
      // check that media asset data is stored
      assert.equal(data[0].toNumber(), 1, "media id must be 1");
      assert.equal(data[1], mediaName1, "media name must be " + mediaName1);
      assert.equal(data[2], mediaDescription1, "media name must be " + mediaDescription1);
      assert.equal(data[3], poster, "media author must be " + poster);
      assert.equal(data[5], mediaTags1, "media tags must be " + mediaTags1);
      assert.equal(data[6], mediaHash1, "media hash must be " + mediaHash1);
      assert.equal(data[7], mediaType1, "media type must be " + mediaType1);
      assert.equal(data[8], mediaExtension1, "media extension must be " + mediaExtension1);

      return mediaGalleryInstance.mediaCounter();
    }).then((count) => {
      // check count of total media assets
      assert.equal(count, 2, "number of media asssets must be 2");
    });
  }); 
});