'use strict';

var router = (function (module) {
  module.host = 'http://youcloset-api.herokuapp.com';

  var Router = Backbone.Router.extend({
    routes:{
      '': 'home',
      'uploadArticle': 'uploadArticle'
    },

    home: function(){
      console.log('im home function');
      $('#content').empty().load('partials/allArticles.html');
      allArticles.init();
    },

    uploadArticle: function(){
      $('#content').empty().load('partials/image-upload.html');
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
  $('body').on('click', '#uploadArticle', function(e){
    e.preventDefault();
    console.log('after');
    aws.init();
  });
});
