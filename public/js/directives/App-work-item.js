(function(){
'use strict'

angular.module('App.Directive.ItemWork', [])

.directive('itemWork', itemWork)



function itemWork ($http){

  function _controller($scope) {

    $scope.show_work_details = function (workId) {
      $scope.showWorkDetails(workId)    
    }



    $scope.deleteWork = function (){
      var confirmar = confirm('Seguro que desea eliminar el trabajo?')
      if(confirmar) {      
        $http.delete('http://localhost:3000/api/works/' + $scope.config._id)
        
        .then(function(data){
          console.log('Eliminado en DB ' + $scope.config.name.es)
        })
        
        .catch(function(err){
          alert('ERROR AL ELIMINAR!')
          console.log(err)
        })
      }
    }



    $scope.checkboxChange = function(){
      $http.put('http://localhost:3000/api/works/approved/' + $scope.config._id, {
        'approved' : $scope.config.approved
      })

      .then(
      function(data){
        console.log('Aztualizado en DB')
      },
      function(err){
        alert('ERROR AL ACTUALIZAR!')
        console.log(err)
      })
      //console.log('Cambio ID:: ' + $scope.config._id)
    }
  }


  function _link(scope, element, attrs, ctrl) {

  }

  return {
    restrict : 'EA',
    scope : {
      'config' : '=',
      'showWorkDetails' : '='
    },
    templateUrl : 'partials/directives/App-work-item.html' ,
    controller : _controller,
    link : _link
  }
}




})()