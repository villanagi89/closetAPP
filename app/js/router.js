/*global $:false*/
'use strict';

var router = (function (module) {
  module.host = 'http://youcloset-api.herokuapp.com';

  var Router = Backbone.Router.extend({
    routes:{
      '': 'home',
      'showArticles': 'showArticles',
      'uploadArticle': 'uploadArticle',
      'userSignUp': 'userSignUp'
    },


    home: function(){
      $('#content').empty().load('partials/mainPage.html');
    },

    showArticles: function(){
      $('#content').empty().load('partials/allArticles.html');
      allArticles.init();
    },

    uploadArticle: function(){
      $('#content').empty().load('partials/image-upload.html');
    },
    userSignUp: function(){
      $('#content').empty().load('partials/user.html');
      userForm.init();
    }

 });

  module.router = new Router();
  module.backbone = function(){
    Backbone.history.start();
  };
  return module;

})(router || {});

$(document).ready(function(){
  router.backbone();
  $('body').on('click', '#uploadArticle', function(e){
    e.preventDefault();
    aws.init();
  });
});
