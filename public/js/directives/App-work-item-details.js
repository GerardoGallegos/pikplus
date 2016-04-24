(function(){
'use strict'
 
angular.module('App.Directive.ItemWorkDetails', [])

.directive('itemWorkDetails', itemWork)



function itemWork ($http) {

  function _controller($scope) {


    function _getTagsCompiled (array) {         
      var _arrTmp = []

      for (var i = 0; i < array.length; i++) {
        _arrTmp.push({ text : array[i] })
        if(i === array.length-1) {
          return _arrTmp
        }
      }
    }

    function _compileTagsText (objectArray) {
          var txt = '';
          for(var i in objectArray) {
            txt += objectArray[i].text;
            if(i<objectArray.length-1) {
              txt +=','
            }
            if(i == objectArray.length-1) {
              //ultima iteracion
              return txt;
            }
          }
      }

    function _getCleanUrl(nameString) {
            //debugger
            if(nameString.search(/\s/g) != -1) {
              return (nameString.replace(/\s/g, '-')).toLowerCase();
            }
            else {
              return nameString
            }

    }
       

    

    $scope.show_work_details = function (workId) {
      $scope.showWorkDetails(workId)    
    }

    $scope.log = function(){
      console.log($scope)
    }


    $scope.$watch('show', function(){
      if($scope.show  === true) {      
        $scope.tags_es = _getTagsCompiled($scope.workData.tags.es)
        $scope.tags_en = _getTagsCompiled($scope.workData.tags.en)
        $scope.approved = $scope.workData.approved;
      }
    })

    $scope.showDetails = function(){
      $scope.show = !$scope.show;
    }

    $scope.deleteWork = function (){

      swal({
        title: "Seguro?",   
        text: "Eliminar " + $scope.workData.name.es + "?",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Si, Eliminarlo!",   
        closeOnConfirm: false 
      }, 
      function(){ 
        $http.delete('http://localhost:3000/api/works/' + $scope.workData._id)
        
        .then(function(data){
          swal("Eliminado Exitosamente!", "Trabajo Eliminado", "success")
        })
        
        .catch(function(err){
          swal("Oops...", "Error al Eliminar!", "error");
          console.log(err)
        })
      })
    }

    $scope.editWork = function (){
      var confirmar = true;//confirm('Seguro que desea editar el trabajo?')
      console.log(_compileTagsText($scope.workData.tags_es))
      if(confirmar) {      
        $http.put('http://localhost:3000/api/works/' + $scope.workData._id, {
          name_es : $scope.workData.name.es,
          name_en : $scope.workData.name.en,
          url_es : _getCleanUrl($scope.workData.name.es),
          url_en : _getCleanUrl($scope.workData.name.en),
          tags_es : _compileTagsText($scope.tags_es),
          tags_en : _compileTagsText($scope.tags_en),
          description_es : $scope.workData.description.es,
          description_en : $scope.workData.description.en,
        })
        
        .then(function(data){
         swal("Editado Exiosamente!", "Informacion actualizada", "success")
        })
        
        .catch(function(err){
          swal("Oops...", "Error al Editar!", "error");
          console.log(err)
        })
      }
    }


    $scope.approvedWork = function(){
      $http.put('http://localhost:3000/api/works/approved/' + $scope.workData._id, {
        'approved' : $scope.workData.approved
      })

      .then(
      function(data){
         swal("Actualizado Exiosamente!", "Trabajo aprobado " + $scope.workData.approved, "success")
      },
      function(err){
        swal("Oops...", "Error al Actualizar!", "error");
        console.log(err)
      })

    }

    $scope.originalWork = function(){
      $http.put('http://localhost:3000/api/works/original/' + $scope.workData._id, {
        'original' : $scope.workData.original
      })

      .then(
      function(data){
        swal("Actualizado Exiosamente!", "Trabajo original " + $scope.workData.original, "success")
      },
      function(err){
        swal("Oops...", "Error al Actualizar!", "error");
        console.log(err)
      })

    }


  }


  function _link(scope, element, attrs, ctrl) {

  }

  return {
    restrict : 'EA',
    scope : {
      'workData' : '=config',
      'show' : '='
    },
    templateUrl : 'partials/directives/App-work-item-details.html' ,
    controller : _controller,
    link : _link
  }
}




})()