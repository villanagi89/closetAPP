'use strict';

var router = (function (module) {
  module.host = 'http://youcloset-api.herokuapp.com';

  var Router = Backbone.Router.extend({
    routes:{
      '': 'home',
      'uploadImage': 'uploadImage'
    },
    home: function(){
      $('#content').empty();
      $.ajax({
        // youcloset-api.herokuapp.com/users/1/closets
        url: module.host + '/users/1/closets',
        type: 'GET'
      }).done().fail();
    },
    uploadImage: function (){
      $('#content').empty().load('partials/image-upload.html');
      aws.init();
    },
 });

  module.router = new Router();
  module.backbone = function(){
    console.log('this is the home page');
    Backbone.history.start();
  };
  return module;

})(router || {});

$(document).ready(function(){
  router.backbone();
});
