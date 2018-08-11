App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    return App.initContract();
  },

  initContract: function() {
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
