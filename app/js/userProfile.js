/*global $:false*/
'use strict';

var userProfile = (function(module){
  var id, apiHost;

  module.init = function(){
    id = localStorage.getItem('id');
    apiHost = 'https://youcloset-api.herokuapp.com';
    module.getUser(id);
  };

  module.getUser = function(id){
    $.ajax({
      url: apiHost + '/users/' + id,
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      console.log(data);
      var template = Handlebars.compile($('#user_profile_template').html());
      $('#content').html(template({
        user: data
      }));
      $('form#add-closet-form').hide();
      $('#createCloset').on('click',function() {
        $('form#add-closet-form').toggle();
      });

    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.createCloset = function(id){
    $.ajax({
      // POST /users/:user_id/closets(.:format)      closets#create
      url: apiHost + '/users/' + id + '/closets',
      type: 'POST',
      dataType: 'JSON',
      data:{
        closet: {
          name: $('#name').val(),
        }
      }
    }).done(function(data){
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

    return module;

})(userProfile || {});



