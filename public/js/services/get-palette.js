(function(){
'use strict'

var Palette = angular.module('App.Service.Palette', [])


.service('$getPalette', function() {

  this.getColors = function(src, scope) {

    getCanvasColor(src, scope);

    function getCanvasColor(src, scope) {

      var width = 800
      var height = 800

      var img = new Image()
      img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = width * (img.height / img.width);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, canvas.height);
        var id = ctx.getImageData(0, 0, canvas.width, canvas.height);

        var stats = Colorgram.extract({
          width: canvas.width,
          height: canvas.height,
          data: id.data,
          channels: 4,
          canvas: canvas
        }, 6);

        scope.$apply(function() {
          scope.colorData = stats;
          scope.preview = canvas.toDataURL("image/png", 1); // canvas.toDataURL("image/png", 1);
        });

      };
      img.crossOrigin = 'Anonymous'
      img.src = src;
    }
  }
})

})()
