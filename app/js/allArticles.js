'use strict';
var allArticles = (function(module){

   $('.categories').on('click', function(event){
     var categoryId = event.target.id;
     var selector = '.grid-items-lines ' + '.' + categoryId;

     $('.grid-items-lines li').hide();
     $(selector).show();
   });

    $('#allArticles').on('click', function(event){
    $('.grid-items-lines li').show();
   });

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
