(function(){
'use strict'

angular.module('App.Directive.UserItem', [])

.directive('userItem', _userItem)



function _userItem ($http){

  function _controller($scope) {
    
    $scope.deleteUser = function (id) {
      var confimar = confirm('Eliminar usuario: ' + $scope.config._id)
      if(confimar === true) {
        console.log('DELETADO' + $scope.config._id)
        $http.delete('http://localhost:3000/api/users/' + $scope.config._id)
        .then(function(){
          console.log('Eliminado OK')
        })
        .catch(function(){
          alert('Error al eliminar')
        })
      }
    }

    $scope.change = function(){

      //console.log($scope.config)
      $http.put('http://localhost:3000/api/users/' + $scope.config._id, {
        'works' : $scope.config.permissions.works,
        'statistics' : $scope.config.permissions.statistics,
        'upload' : $scope.config.permissions.upload,
        'users' : $scope.config.permissions.users,
      })

      .then(function(data){
        console.log('Aztualizado en DB')
      },

      function(err){
        alert('ERROR AL ACTUALIZAR!')
        console.log(err)
      })

    }
  }

  function _link(scope, element, attrs, ctrl) {

  }

  return {
    restrict : 'EA',
    scope : {
      'config' : '='
    },
    templateUrl : 'partials/directives/App-user-item.html' ,
    controller : _controller,
    link : _link
  }
}




})()