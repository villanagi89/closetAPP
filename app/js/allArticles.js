'use strict';
var allArticles = (function(module){

  module.init = function(){
    $.ajax({
        // youcloset-api.herokuapp.com/users/1/closets
        // /users/:user_id/articles
        url: 'http://youcloset-api.herokuapp.com/users/1/articles',
        type: 'GET',
        dataType: 'JSON',
      }).done(function(data){
        console.log(data);
        var template = Handlebars.compile($('#all_articles_template').html());
        $('#content').html(template({
          articles: data
        }));
      }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
      });
    };

  return module;

})(allArticles || {} );
