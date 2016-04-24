(function(){
'use strict'

/*  login.js    
 ******************************************************************
*/

angular.module('App.Controller.Users', [])


.controller('UsersController', _usersController)


function _usersController ($scope, $users) {
  $scope.users = $users.query()
}

})()