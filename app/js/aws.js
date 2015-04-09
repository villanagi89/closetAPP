/*global $:false*/
'use strict';
var aws = (function(module){

  module.init = function(){
    $.ajax({
      url: 'http://youcloset-api.herokuapp.com/amazon/sign_key',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      console.log(data);
      module.sendAwsRequest(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };
  module.setPrefilter = function(){
    $.ajaxPrefilter(function(options){
      options.headers = options.headers || {};
      options.headers['Accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
    });
  };

  module.sendAwsRequest = function(data){
    console.log(data);
    console.log('request');
    module.setPrefilter();
    var fd = new FormData();
    var file = $('#file')[0].files[0];

    // we are gonna build a form data object
    fd.append('key', data.key);
    fd.append('AWSAccessKeyId', data.access_key);
    fd.append('policy', data.policy);
    fd.append('signature', data.signature);
    fd.append('Content-Type', file.type);
    fd.append('file', file);
    $.ajax({
      url: 'https://s3.amazonaws.com/you.closet.api',
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false
    }).done(function(){
      console.log('uploaded to AWS');
      module.sendAwsToRails(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };
  module.sendAwsToRails = function(data){
    var artName = $('#title').val();
    var amazonURL = 'https://s3.amazonaws.com/you.closet.api/' + data.key;
    var artCategory = $('#category :selected').val();
    var artType = $('#article_type :selected').val();
    // var closetId = $('.show-closet').data("closet-id");
    $.ajax({
      url: 'http://youcloset-api.herokuapp.com/articles',
      type: 'POST',
      data: { article: {
        name: artName,
        url: amazonURL,
        category: artCategory,
        article_type: artType
        // closet_id: closetId
         }},
    }).done(function(data){
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  return module;
})(aws || {});

$(document).ready(function(){
});
