/*global $:false*/
'use strict';

var userForm = (function(module){
  var authToken, apiHost;

  module.init = function(){
    authToken = localStorage.getItem('authToken');
    apiHost = 'https://youcloset-api.herokuapp.com';
    module.setupAjaxRequests();
    module.submitRegistration();
    // $('#signin-form').on('submit', submitLogin);
    // $('#signup-form').on('submit', module.submitRegistration);
    $('#sign-out').on('click', module.signOut);
  };

  module.submitRegistration = function(){
    $.ajax({
      url: apiHost + '/users',
      type: 'POST',
      data: {user:{
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
      }},
    }).done(module.loginSuccess).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
      });
    return false;
  };

  module.loginSuccess = function(userData){
    localStorage.setItem('authToken', userData.token);
    console.log('Logged in!');
    window.location.href = '/';
  };

  module.submitLogin = function(){
    var $form;
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: apiHost + '/users/sign_in',
      type: 'POST',
      data: $form.serialize()
    }).done(module.loginSuccess).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
      });
    return false;
  };
  module.setupAjaxRequests = function(){
    $.ajaxPrefilter(function(options){
      options.headers = {};
      options.headers['AUTHORIZATION'] = 'Token token=' + authToken;
    });
  };

  module.acceptFailure = function(error){
    if(error.status === 401){
      console.log('send to login screen');
      window.location.href = '/signin.html';
    }
  };

  module.signOut = function(event){
    event.preventDefault();
    localStorage.removeItem('authToken');
    authToken = undefined;
    window.location.href = '/signin.html';
  };

  return module;

})( userForm || {} );
