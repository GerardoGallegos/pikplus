(function(){
'use strict'

/*  works.js    
 ******************************************************************
*/

angular.module('App.Controller.Works', [])


.controller('WorksController', _works)

function _works ($scope, $works, $http, $management, $management2){

    
    $scope.show = false            // Show Details
    $scope.showTag = 'works'       // Show works window
    $scope.language = 'es'         // Default Language
    $scope.works = $works.query()  // Array con Works de API
    $scope.workData = []           // Object con Work de API
    $scope.statistics = { total : 0 }
    

  

    // Cambia el valor de showTag
    $scope.navega = function (val){
      $scope.showTag = val;
      $scope.actualiza()
    }

    // Esta funcion se llama desde la Directiva item-Works
    $scope.showDetails = function(obj){
      $scope.show = true
      $scope.workData = obj
      console.log($scope.workData)
      console.log($scope.works)
    }


    // Busqueda parcial en API
    $scope.partialSearch = function (model){
      $http({
        method : 'GET',
        url : 'http://localhost:3000/api/' + $scope.language + '/' + model + '/' + $scope.inputSearch
      })
      .then(function (res) {
        console.log($scope.language)
        console.log(res.data)
        $scope.dataSearch = res.data
        // ACTUALIZA DATOS
/*        $management2.$getStatistics($scope.language, 'tags').then(function (res){
            $scope.statistics.total = res.data[0].total
          })*/
        })
      .catch(function(err){
        swal("Oops...", "Error al Buscar", "error")
      })
    }

    // POST NEW en API
    $scope.add = function (model) {
      $management2.$postOne($scope.language, model, {
        text : $scope.inputSearch
      })
      .then(function (res){
        swal("Tag Creada Exitosamente",  $scope.inputSearch, "success")
        $scope.actualiza() // Actualiza Datos de API
      })
      .catch(function (err){
        swal("Oops...", "Error al Crear Tag", "error");
      })
    }


    

    $scope.actualiza = function() {

      switch($scope.showTag) {
        case('works'):
          $scope.works = $works.query()
          break

        case('tags'):

          // TAGS
          $management2.$getAll($scope.language, 'tags').then(function (res){
            $scope.dataSearch =  res.data
          })

          // AGREGATION
          $management2.$getStatistics($scope.language, 'tags').then(function (res){
            $scope.statistics.total = res.data[0].total
          })
          break

        case('buckets'):
          //$scope.dataBuckets = $management('es', 'buckets').query()

          // BUCKETS
          $management2.$getAll($scope.language, 'buckets').then(function (res){
            $scope.dataSearch =  res.data
          })

          // AGREGATION
/*          $management2.$getStatistics($scope.language, 'buckets').then(function (res){
            $scope.statistics.total = res.data[0].total
          })*/
          break

        case('groups'):
          $scope.dataGroups = $management('es', 'groups').query()
          break
      }

    }

    $scope.actualiza()// get Data init

    


}

})()