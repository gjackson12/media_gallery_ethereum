# Media Gallery

<img align="center" src="https://github.com/gjackson12/media_gallery_ethereum/blob/master/src/images/home_1.png">

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

When adding a new media assset a user is asked to provide the following (all three inputs are required):

* **Name**: The name of the media asset that will be shared. The name provided needs to be 50 characters or less.
* **Description**: A description of the media asset that will be shared. The description provided needs to be 90 characters or less.
* **Tags**: Addiitonal keywords you wish to attach to the media asset. The total length of the tags needs to be 75 characters or less.

<img align="center" src="https://github.com/gjackson12/media_gallery_ethereum/blob/master/src/images/add_media_modal.png" width="500" height="500">

After submitting a new media asset you need to submit/sign the transaction via Metadata. Once the transaction has been mined an event will be emitted indicating that a new media asset has been added, and the page will re-load displaying the shared media. You will see the video/image, the title, the description, and the associated tags.

<img align="center" src="https://github.com/gjackson12/media_gallery_ethereum/blob/master/src/images/home_2.png">

Additionally, you can view more metadata by clicking on the view details button for a given media asset. You will see the following:

* **Author Address**: The address of the account that shared the media asset.
* **Media Create Date**: The datetime stamp via the block.timestamp to detail when the media was shared on the blockchain.
* **Media Multi-Hash**: The multi-hash for the media asset that was shared.
* **Media Type**: The type of media shared, either an image or video.
* **Media Extension**: The extension for the media file shared.

<img align="center" src="https://github.com/gjackson12/media_gallery_ethereum/blob/master/src/images/media_details_modal.png">

You are able to search for media added by a specific user via the search bar at the top of the page. Enter the address of another account, and view any associated media they have shared. The image below shows sample search results:

<img align="center" src="https://github.com/gjackson12/media_gallery_ethereum/blob/master/src/images/search_results.png">

## Getting Started

### 1. Check node version

Make sure you have node version 8.5.0 or greater. In your terminal run the following command:

```
node --version
```

### 2. Prerequisites

Open your terminal and ensure that you have installed the Truffle framework and the ganache-cli in order to run a local blockchain:

```
npm install -g truffle
npm install -g ganache-cli
```

Open a new tab in your terminal and start your local blockchain instance on 8545:
```
ganache-cli
```

### 3. Setup DApp

Open a new tab in the terminal and run the following command:

```
git clone https://github.com/gjackson12/media_gallery_ethereum.git media-gallery-dapp && cd media-gallery-dapp
npm install
```

Now, you need to compile the MediaGallery contract with the following command in the media-gallery-dapp directory: 
```
truffle compile
```

Next, you need to migrate the compiled contracts to your local blockchain instance on port 8545:
```
truffle migrate --network development
```

Open a new tab in your terminal, navigate to the media-gallery-dapp directory, and start-up the lite-server to access the application user interface:

```
npm run dev
```

Your default browser should open up at this point with the application displayed at [http://localhost:3000](http://localhost:3000)

If you don't have the MetaMask extension (or another wallet provider) follow instructions of the next step.

### 4. Connect to your local blockchain via Metamask

* If you don't already have it you will need to install the [MetaMask Chrome Browser Extension](https://metamask.io/).

* Click Restore from seed phrase...

* Enter the seed phrase (Mnemonic) that ganache-cli provides when it starts-up in your terminal.

:warning: Be careful not to mix up your test wallet with your real one on the Main Network.

* Click where it says "Ethereum Main Network" and select "Localhost 8545". Click the back arrow to return to your account.

* You should see your first test account now has close to 99 ETH (less than 100 becasue by now you have deployed the contract). Additional generated accounts will also have 100 ETH.

* Click referesh in your browser and you should see your account # and balance in the top right-hand corner of the navigation bar.

### Optional: Deploy to IPFS

Since this app is just a bunch of HTML and JavaScript, you can also deploy and use it directly from IPFS. This will require that you run a local IPFS daemon. Just run:

```
./deploy.sh
```

### Troubleshooting Tips

#### 1. Slow Performance

This application is leveraging infura to upload files to IPFS so it can take up to 30 seconds before Metamask prompts you to sign/submit a transaction.  Be patient!

:warning: YOU NEED TO HAVE INTERNET ACCESS TO UPLOAD FILES!


#### 2. Metamask Issues

If upon trying to add a image you are not being prompted by metamask to submit a transaction, try selecting a different network, and then selecting "Localhost 8545" again. Also, check that the account you are attempting to use still exists on your local blockchain instance of ganache-cli. 