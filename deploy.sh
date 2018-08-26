#!/bin/sh

if ! curl --silent --output /dev/null localhost:5001
  then echo "\nPlease start a local IPFS daemon first: https://ipfs.io/docs/install/\n" ; exit ; fi

HASH=$(ipfs add -r dist | tail -n 1 | cut -d ' ' -f 2)

echo "\nPushing to https://gateway.ipfs.io..."

# Pin directory hash and children to Origin IPFS server
echo "https://gateway.originprotocol.com:5002/api/v0/pin/add?arg=$HASH" | xargs curl --silent --output /dev/null

# Fetch the hash back again
echo "https://gateway.ipfs.io/ipfs/$HASH" | xargs curl --silent --output /dev/null

echo "\nDeployed to https://gateway.ipfs.io/ipfs/$HASH\n"