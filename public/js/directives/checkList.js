App.directive('upCheck', function() {

  function controller ($scope) {
    $scope.toggle = function () {
      if($scope.check=== false){
        $scope.check = true
      }
      else {
        $scope.check = false
      }
    }
  }

  function link (scope, elem, attrs, ctrl) {
    
  }

  var template = '<h1 ng-if="check">Hola</h1> <input type="checkbox" ng-click="toggle()" />'


  return {
    restrict : 'A',
    scope : {
      //check : '='
    },
    controller : controller,
    link : link,
    template : template
  }
})
