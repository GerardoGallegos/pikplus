(function(){
'use strict'

var UpZone = angular.module('App.Directive.UpZone', [])

.directive('upZone', function($getPalette) {

  return {
    restrict: 'EA',

    controller: function ($scope) {
      this.getFileExtension = function(fileName) {
        var cleanName = fileName.substr(-4)
        return cleanName.substring(cleanName.search(/\./g) + 1, cleanName.length)
      }

      this.cleanScope = function () {
        $scope.preview = ''
        $scope.colorData = []
        $scope.form = null
        $scope.form = new FormData()
      }
    },
    link: function(scope, element, iAttrs, ctrl) {

      var ballHeard = element.find('div')[0],
          __process = element.find('div')[1],
          upZope = element.find('div')[2],
          imgArrow = element.find('img')[0];

      scope.$watch('preview', function (val){
        if(val === '') {
          ctrl.cleanScope();
          ballHeard.style.display = 'none'
          imgArrow.style.display = 'none'
          __process.style.display = 'none'
          upZope.style.display = 'block'
        }
        if(val !='') {
          //
        }
      })



      scope.active = false;

      //Limpia el $Scope
      __process.addEventListener('click', function(){
        ctrl.cleanScope()
        ballHeard.style.display = 'none'
        imgArrow.style.display = 'none'
        __process.style.display = 'none'
        upZope.style.display = 'block'
      })

      upZope.addEventListener('dragenter', function(e) {
        e.preventDefault()
        ballHeard.style.display = 'block'
        imgArrow.style.display = 'block'
        scope.$apply(function(){
          scope.active = true
        })
      });

      upZope.addEventListener('dragover', function(e) {
        e.preventDefault();
        console.log('a')
      });

      upZope.addEventListener('dragleave', function(e) {
        e.preventDefault();
        ballHeard.style.display = 'none'
        imgArrow.style.display = 'none'
        scope.$apply(function(){
          scope.active = false
        })
      });

      upZope.addEventListener('drop', function(e) {
        e.preventDefault();
        ballHeard.style.display = 'none'
        imgArrow.style.display = 'none'
        __process.style.display = 'block'
        upZope.style.display = 'none'
        scope.$apply(function(){
          scope.active = false
        })


        function getImgPreview(file) {
          var reader = new FileReader();
          reader.onload = function(e) {
            //Obtengo la paleta de colores de la imagen
            $getPalette.getColors(e.target.result, scope);
            /*scope.$apply(function() {
              scope.preview = e.target.result;
            });*/
          }
          reader.readAsDataURL(file);

        }
        traverseFileTree(e.dataTransfer.items[0].webkitGetAsEntry());

        function traverseFileTree(item, path) {

            path = path || ""

            if (item.isFile) {
              // Get file
              item.file(function(file) {
                scope.form.append('files', file)
                scope.navega(2)

                //GENERA PREVIEW Y EXTRAE LOS COLORES DE LA IMAGEN
                if ( ctrl.getFileExtension(file.name) === 'jpg' || ctrl.getFileExtension(file.name) === 'png' ) {
                  getImgPreview(file)
                }
              })
            }

            else if (item.isDirectory) {

              // Get folder contents
              var dirReader = item.createReader();
              dirReader.readEntries(function(entries) {

                //FOLDER ORIGINAL DETECTED
                if(item.name.toLowerCase() === 'original') {
                    scope.$apply(function() {
                        scope.original = true;
                    });
                }

                //RECORRE TODOS LOS FOLDERS
                for (var i = 0; i < entries.length; i++) {
                  traverseFileTree(entries[i], path + item.name + "/");
                }
              })
            }
        }

      }) //end Drop
    },
    templateUrl: 'partials/directive-upZone.html'
  }
})


})()