(function(){
'use strict'

angular.module('App.Directive.WorkListItem', [])

.directive('worklistItem', _listItem)



function _listItem ($http, $management2){

  function _controller($scope) {


    $scope.deleteItem = function (model){

      swal({
        title: "Seguro?",   
        text: "Eliminar " + $scope.data.text + "?",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Si, Eliminarlo!",   
        closeOnConfirm: false 
      }, 
      function(){ 
        $management2.$deleteOne($scope.lang, model, $scope.data._id )
        .then(function (res) {
          swal("Tag Eliminada!", 'Eliminada: '+ $scope.data.text +'!', "success")
          $scope.refresh()
        })
        .catch(function(err){
          swal("Oops...", "Error al Eliminar!", "error")
        })
      })
      
    }


    $scope.updateItem = function (model){

      $management2.$putOne($scope.lang, model, $scope.data._id, {
        text : $scope.data.text
      })
      .then(function (res) {
        swal("Editado Exitosamente!", "Tag editada: " + $scope.data.text, "success")
      })
      .catch(function(err){
        swal("Oops...", "Error al Editar!", "error");
      })
    }


  }

  function _link(scope, element, attrs, ctrl) {

  }

  return {
    restrict : 'EA',
    scope : {
      'data' : '=',
      'lang' : '=',
      'refresh' : '='
    },
    templateUrl : 'partials/directives/App-work-list-item.html',
    controller : _controller,
    link : _link
  }
}




})()