(function(){
'use strict'

/*  login.js    
 ******************************************************************
*/

angular.module('App.Controller.Login', [])


.controller('LoginController', _loginController)


function _loginController($rootScope, $scope, $auth, $location) {
    $scope.login = function () {
      $auth.login({
            username: $scope.username,
            password: $scope.password
      })
      .then(function(){
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            console.log($scope)

                $scope.user.name = JSON.parse( atob($auth.getToken().split('.')[1]) ).name
                $scope.user.permissions = JSON.parse( atob($auth.getToken().split('.')[1]) ).permissions
                console.log($scope.user)


            $location.path("/works")
      })
      .catch(function(response){
        console.log('err ', response.data)
            // Si ha habido errores llegamos a esta parte
      });
    }
}

})()