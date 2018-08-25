# Media Gallery

**MediaGallery** is a decentralized application (DApp) library to upload and share media assets on the Ethereum blockchain.

# Inspiration:
* I am a frequent user of Instagram, so I thought I would try to create an application that allowed users to share media.
* One by product of sharing media on the blockchain is you have authenticity built in, in the sense that you know that the media was provided by an address, and that the media hasn't been changed since they provided it due to immutability of a transaction.

# Functionality
The purpose of this Media Galleru DApp as mentioned before is to allow anyone with an address to share media. The application allows users to share/upload any of the following file types:
* .mp4 (video)
* .ogv (video)
* .png (image)
* .jpeg/jpg (image)
* .gif (image)
* .tiff (image)

Any file that is shared is stored on the interplanetary file system (IPFS). The IPFS service returns a [multi-hash](https://github.com/multiformats/multihash#table-for-multihash-v100-rc-semver) which is a self describing hash. This hash is stored on the contract with the other metadata describing the shared media asset such as name, description, and tags.

When adding a new media assset a user is asked to provide the following:

* **Name**: The name of the media asset that will be shared. The name provided needs to be 125 characters or less.
* **Description**: A description of the media asset that will be shared. The description provided needs to be 250 characters or less.
* **Tags**: Addiitonal keywords you wish to attach to the media asset. The total length of the tags needs to be 150 characters or less.

