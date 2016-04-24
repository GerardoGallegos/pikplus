(function(){
'use strict'

/*  GET DATA PI   
 ******************************************************************
*/

angular.module('App.Factory.GetDataAPI', [])



.factory('$management', function ($resource){
  return function (language, model) {
    return $resource('http://localhost:3000/management/'+ language +'/'+ model +'/:id')
  }
})

.factory('$tags', function ($resource){
  return function (language) {
    return $resource('http://localhost:3000/management/'+ language +'/tags/:id')
  }
})

.factory('$buckets', function ($resource){
  return function (language) {
    return $resource('http://localhost:3000/management/'+ language +'/buckets/:id')
  }
})

.factory('$users', function ($resource){
    return $resource('http://localhost:3000/api/users/:id')
})


.factory('$works', function ($resource){
  return $resource('http://localhost:3000/api/works/:id')
})


.factory('$management2', function ($http){

  var _getStatistics = function(language, model) {
    return $http({
      method : 'GET',
      url : 'http://localhost:3000/management/'+ language +'/'+ model +'/stadistics'
    })
  }

  var _getAll = function(language, model) {
    return $http({
      method : 'GET',
      url : 'http://localhost:3000/management/'+ language +'/'+ model +'/'
    })
  }

  var _getOne = function(language, model, id) {
    return $http({
      method : 'GET',
      url : 'http://localhost:3000/management/'+ language +'/'+ model +'/' + id
    })
  }

  var _postOne = function(language, model, data) {
    return $http({
      method : 'POST',
      url : 'http://localhost:3000/management/'+ language +'/'+ model,
      data : data
    })
  }

  var _putOne = function(language, model, id, data) {
    return $http({
      method : 'PUT',
      url : 'http://localhost:3000/management/'+ language +'/'+ model +'/' + id,
      data : data
    })
  }

  var _deleteOne = function(language, model, id) {
    return $http({
      method : 'DELETE',
      url : 'http://localhost:3000/management/'+ language +'/'+ model +'/' + id
    })
  }

  return {
    $getAll : _getAll,
    $getOne : _getOne,
    $postOne : _postOne,
    $putOne : _putOne,
    $deleteOne : _deleteOne,
    $getStatistics : _getStatistics
  }

})


})()


// $management2.getAll(language, model, id)