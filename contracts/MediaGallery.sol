pragma solidity ^0.4.24;

contract MediaGallery {
    bool public isStopped;
    address owner;
    uint public mediaCounter;

    struct MediaAsset {
        uint id;
        string name;
        string description;
        address author;
        uint createDate;
        string tags;
        string mediaHash;
        string mediaType;
        string extension;
    }

    mapping(address => MediaAsset[]) public mediaDatabase;

    event LogNewMediaAsset(
        uint indexed _id,
        string _name,
        address _author,
        uint _createDate,
        string _mediaHash,
        string _mediaType
    );


    modifier stoppedInEmergency {
        require(
            !isStopped,
            "The contract has been stopped"
        );
        _;
    }

    modifier onlyAuthorized {
        require(
            msg.sender == owner,
            "Sender not authorized."
        );
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function addMedia(
        string _name,
        string _description,
        string _mediaHash,
        string _tags,
        string _mediaType,
        string _extension
        ) public  stoppedInEmergency {
        MediaAsset memory currentMedia;
        uint date = block.timestamp;

        currentMedia.id = mediaCounter;
        currentMedia.name = _name;
        currentMedia.description = _description;
        currentMedia.author = msg.sender;
        currentMedia.createDate = date;
        currentMedia.mediaHash = _mediaHash;
        currentMedia.tags = _tags;
        currentMedia.mediaType = _mediaType;
        currentMedia.extension = _extension;

        mediaDatabase[msg.sender].push(currentMedia);

        emit LogNewMediaAsset(
            mediaCounter,
            _name,
            msg.sender,
            date,
            _mediaHash,
            _mediaType
        );

        mediaCounter++;
    }

    function getMediaByAddress(address _user) public view returns (uint[]) {
        require(mediaDatabase[_user].length > 0, "No media found for this user");

        uint[] memory mediaAssetIds = new uint[](mediaDatabase[_user].length);

        uint numberOfMediaAssets = 0;

        for(uint i = 0; i < mediaDatabase[_user].length;  i++) {
            mediaAssetIds[numberOfMediaAssets] = mediaDatabase[_user][i].id;
            numberOfMediaAssets++;
        }
        return mediaAssetIds;
    }
}