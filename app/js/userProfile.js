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
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
  };

    return module;

})(userProfile || {});


