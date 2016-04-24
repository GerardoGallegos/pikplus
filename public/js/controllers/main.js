(function(){
'use strict'

/*  signup.js    
 ******************************************************************
*/

angular.module('App.Controller.Main', [])


.controller('MainController', _main)

function _main ($scope, $auth){

  var token;

  if($auth.getToken()) {
    token = JSON.parse( atob($auth.getToken().split('.')[1]) )
    $scope.user = {
      name : token.name,
      permissions: token.permissions
    }
  }
  else {
    $scope.user = {
      name : false,
      permissions:  {
        works: false,
        statistics: false,
        upload: false,
        users: false
      }
    }
  }


  $scope.log = function(){
    console.log( $scope.user )
  }


  $scope.logout = function () {

    $auth.logout()
    $scope.user = {
      name : false,
      permissions:  {
        works: false,
        statistics: false,
        upload: false,
        users: false
      }
    }  
  }


}

})()