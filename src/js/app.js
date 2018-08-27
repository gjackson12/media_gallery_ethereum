App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  ipfs: null,
  fileRep: null,
  file: null,
  loading: false,

  init: function () {
    App.createIpfs();
    App.initTags();
    return App.initWeb3();
  },

  createIpfs: function () {
    App.ipfs = new IpfsApi({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    });
  },

  initTags: function () {
    $('#tags').tagsInput({
      'height': '100px',
      'width': '300px',
      'interactive': true,
      'defaultText': 'add a tag',
      'delimiter': [',', ';'], // Or a string with a single delimiter. Ex: ';'
      'removeWithBackspace': true,
      'minChars': 0,
      'maxChars': 0, // if not provided there is no limit
      'placeholderColor': '#666666'
    });
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }

    web3 = new Web3(App.web3Provider);

    App.displayAccountInfo();

    App.checkAccount();

    return App.initContract();
  },

  displayAccountInfo: function () {
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#account").text("#" + account);
        web3.eth.getBalance(account, function (err, balance) {
          if (err === null) {
            $("#accountBalance").text(web3.fromWei(balance, "ether") + " ETH");
          }
        });
      }
    });
  },

  checkAccount: function () {
    setInterval(function () {
      if (web3.eth.accounts[0] !== App.account) {
        App.account = web3.eth.accounts[0];
        App.loadMedia();
      }
    }, 100);
  },

  initContract: function () {
    $.getJSON("MediaGallery.json", function (mediaGalleryArtifact) {
      App.contracts.MediaGallery = TruffleContract(mediaGalleryArtifact);

      App.contracts.MediaGallery.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.loadMedia();
    });
  },

  captureFile: function (_event) {
    _event.preventDefault();

    var file = _event.target.files[0];

    App.file = file;

    var reader = new window.FileReader();
    if (file) {
      reader.readAsArrayBuffer(file);
      reader.onloadend = function (event) {
        App.fileRep = App.ipfs.types.Buffer(event.target.result);
      }
    }
    $('#upload-file-info').text(_event.target.files[0].name);
  },

  loadMedia: function () {
    if (App.loading) {
      return;
    }
    App.loading = true;

    var searchVal = $('#search-input').val();

    if (searchVal.length == 42) {
      searchAccount = searchVal;
      $('#search-message').text('Search results with media assets for: ' + searchAccount);
    } else {
      searchAccount = App.account;
      $('#search-message').text('');
    }

    var mediaGalleryInstance;

    App.displayAccountInfo();

    App.contracts.MediaGallery.deployed().then((instance) => {
      mediaGalleryInstance = instance;

      mediaGalleryInstance.getNumberMediaByAddress(searchAccount).then((numberOfMedia) => {
        $("#mediaDisplay").empty();

        for (var i = 0; i < numberOfMedia; i++) {
          mediaGalleryInstance.mediaDatabase(searchAccount, i).then((media) => {
            App.displayMedia(media[1], media[2], media[3], media[4], media[5], media[6], media[7], media[8]);
          });
        }
      })
    })

    App.loading = false;

    $(".loading").hide();
  },

  displayMedia: function (_name, _description, _author, _createDate, _tags, _mediaHash, _mediaType, _extension) {
    var mediaDisplay = $("#mediaDisplay");

    var dateNumber = _createDate.toNumber();
    var date = new Date(dateNumber * 1000);

    var tagArray = _tags.split(',,;');

    var _modalId = _name.replace(/ /g, '').toLowerCase() + _mediaHash;

    var cardTemplate = $("#cardTemplate");

    if (_mediaType == 'video') {
      cardTemplate.find('source').attr('src', 'https://ipfs.io/ipfs/' + _mediaHash);
      cardTemplate.find('source').attr('type', _mediaType + '/' + _extension);
      cardTemplate.find('video').attr('style', '');
      cardTemplate.find('img').attr('style', 'display: none;');
    } else {
      cardTemplate.find('img').attr('src', 'http://ipfs.io/ipfs/' + _mediaHash);
      cardTemplate.find('img').attr('style', '');
      cardTemplate.find('video').attr('style', 'display: none;');
      cardTemplate.find('source').attr('src', '');
      cardTemplate.find('source').attr('type', '');
    }

    cardTemplate.find(".media-title").text(_name);
    cardTemplate.find(".media-description").text(_description);
    cardTemplate.find(".media-date").text(date);
    cardTemplate.find(".media-author").text(_author);
    cardTemplate.find(".media-hash").text(_mediaHash);
    cardTemplate.find(".view-details").attr('data-target', "#" + _modalId);
    cardTemplate.find(".media-tags").empty();

    for (var i = 0; i < tagArray.length; i++) {
      cardTemplate.find(".media-tags").append(`<span id='tagTemplate' class='badge badge-pill badge-secondary'>${tagArray[i]}</span>`);
    }

    mediaDisplay.append(cardTemplate.html());

    App.createMediaDetailsModal(_name, _author, date, _mediaHash, _modalId, _mediaType, _extension);
  },

  createMediaDetailsModal: function (_name, _author, _date, _mediaHash, _modalId, _mediaType, _extension) {
    var modalContainer = $("#modalContainer");

    if ($('#' + _modalId).length > 0) {
      return;
    }

    var modalTemplate = $("#mediaDetailsTemplate");
    modalTemplate.find(".fade").attr('id', _modalId);
    modalTemplate.find(".details_title").text(_name);
    modalTemplate.find(".details_author").text(_author);
    modalTemplate.find(".details_date").text(_date);
    modalTemplate.find(".details_hash").text(_mediaHash);
    modalTemplate.find(".details_type").text(_mediaType);
    modalTemplate.find(".details_extension").text(_extension);

    modalContainer.append(modalTemplate.html());
  },

  addMedia: function () {
    $(".loading").show();
    var _media_title = $("#media_title").val();
    var _description = $("#media_description").val();
    var _tags = $("#tags").val();
    var _mediaType = App.file.type.match(/^([^\/]*)/g)[0];
    var _extension = App.file.type.match(/([^/]+$)/g)[0];

    if (_media_title.trim() == "") {
      return false;
    }

    App.ipfs.files.add(App.fileRep, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      App.contracts.MediaGallery.deployed()
        .then(function (instance) {
          return instance.addMedia(
            _media_title,
            _description,
            result[0].hash,
            _tags,
            _mediaType,
            _extension, {
              from: App.account,
              gas: 500000
            }
          );
        })
        .then(function (result) {})
        .catch(function (err) {
          console.error(err);
          $(".loading").hide();
        });
    });
  },

  listenForEvents: function () {
    App.contracts.MediaGallery.deployed().then(function (instance) {
      instance.LogNewMediaAsset({}, {}).watch(function (error, event) {
        if (event) {
          App.loadMedia();
        } else {
          console.error(error);
        }
      });
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});