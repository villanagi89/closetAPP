/*global $:false*/
'use strict';

var userForm = (function(module){
  var authToken, apiHost;

  module.init = function(){
    authToken = localStorage.getItem('authToken');
    apiHost = 'https://youcloset-api.herokuapp.com';
    setupAjaxRequests();
    $('#signin-form').on('submit', submitLogin);
    $('#signup-form').on('submit', submitRegistration);
    $('#sign-out').on('click', signOut);
  };

  module.submitRegistration = function(event){
    event.preventDefault();
    $.ajax({
      url: apiHost + '/users',
      type: 'POST',
      data: {user:{

      }},
    }).done(loginSuccess).fail(function(){});
  };



  return module;

})( userForm || {} );
