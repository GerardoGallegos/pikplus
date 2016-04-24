(function(){
'use strict'

/*  signup.js    
 ******************************************************************
*/

angular.module('App.Controller.Signup', [])

.controller('SignupController', _SignupController)

function _SignupController($scope, $auth, $location) {

    $scope.permissions = {
      works : false,
      statistics : false,
      users : false,
      upload : false
    }

    $scope.signup = function () {
      $auth.signup({
            name : $scope.name,
            username: $scope.username,
            password: $scope.password,
            works : $scope.permissions.works,
            statistics : $scope.permissions.statistics,
            users : $scope.permissions.users,
            upload : $scope.permissions.upload,
      })
      .then(function(res){
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            console.log(res)
            $location.path("/works")
      })
      .catch(function(res){
        console.log('err ', res.data)
            // Si ha habido errores llegamos a esta parte
      });
    }
}


})()