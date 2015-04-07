'use strict';
var aws = (function(module){

  var submitForm = function(){
    event.preventDefault();
    $.ajax({
      url: 'http://youcloset-api.herokuapp.com',
      type: 'POST',

    }).done(function(results){

    }).fail(function(jqXHR, textStatus, errorThrow){
      trace(jqXHR, textStatus, errorThrow);
    }).always(function(response){
      trace(response);
    });
  };


  return module;

})(aws || {});

$(document).ready(function(){
  $('#new-upload-form').on('submit',function(){
    submitForm();
  });
});
