(function(){
  'use strict'

angular.module('App.Controller.Upload', [])


/*
  "Accept": "application/json; charset=utf-8",
  'x-access-token': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYnNvbnR5cGUiOiJPYmplY3RJRCIsImlkIjoiVsOPw408TVx1MDAxNSvCsDFIXHUwMDBiw6EiLCJpYXQiOjE0NTY1MzM4NDAsImV4cCI6MTQ1NjUzOTg0MH0.1tjxXoaSNMGPav-osb6FxhDRD4ohNNW_4wVUKCg0weg'              
*/

/*.run(function($http) {
  
  $http.defaults.headers.common.Accept = 'application/json; charset=utf-8' ;
  //or try this
  $http.defaults.headers.common['x-access-token'] = localStorage.getItem('myApp_token');

})
*/

  .controller('UploadController', function ($scope, $http) {

    $scope.form = new FormData();
    var socket = io();


    socket.on('log', function(msg){
      console.log(msg)
      $('#logs').append('<li id="' + msg.id + '"><div><img src="img/pac.gif"> '+ msg.log +'</div></li>')
    })

    socket.on('log completed', function(msg){
      console.log(msg)
      var ele = document.getElementById(msg.id)
      ele.innerHTML = '<div><img src="img/check.png"> '+ msg.log +'</div>'
    })

    socket.on('log finish', function (msg){
      $scope.$apply(function(){
        $scope.navega(6)
      })
      console.log('COMPLETED')
    })


    $scope.muestra = 1
    $scope.preview = ''

    function previus () {
      $scope.$apply(function(){
        $scope.muestra--
      })
    }

    function next () {
      $scope.$apply(function(){
        $scope.muestra++
      })
    }

    Mousetrap.bind('left', function() {
      previus()
    })

    Mousetrap.bind('right', function() {
      next()
    })



    $scope.navega = function (navegation){
        console.log(navegation)
        $scope.muestra = navegation;
        setTimeout(function($scope){$('#' + navegation).focus()},300)
    }


    function getCompiledColors (arrayColors) {
      var stringColors = '';
        for(var i = 0; i< arrayColors.length; i++){
          stringColors += arrayColors[i] + '#';
          if(i == arrayColors.length-1){
            return stringColors;
          }
        }
    }

  $scope.addInGroup = function(){
    console.log('CLEARED FORM OBJECT * * ')
    $('#logs').html('')
    $scope.preview = ''
    $scope.colorData = []
    $scope.form = null;
    $scope.form = new FormData();
    $scope.navega(1)
  }  

$scope.addNewWork = function () {
        console.log('_CLEANED ALL * * ')
        $('#logs').html('')
        $scope.preview = ''
        $scope.colorData = []

        // CLEAR FORM DATA
        $scope.form = null;
        $scope.form = new FormData();

        // DATA CONTIGUA
        $scope.original = false
        $scope.bucket = []
        $scope.group = []
        $scope.colorData = []

        //  ESPAÑOL
        $scope.name_es = []
        $scope.name_es = []
        $scope.tags_es = []
        $('#description_es').val('')

        //  ENGLISH
        $scope.name_en = []
        $scope.name_en = []
        $scope.tags_en = []
        $('#description_en').val('')

        $scope.navega(1)
  }

    $scope.submit = function () {
      console.log('SUBMITED')

      // DATA CONTIGUA
      $scope.form.append("original", $scope.original);
      $scope.form.append("bucket", $scope.bucket[0].text); //bucket
      $scope.form.append("group", $scope.group[0].text);
      $scope.form.append("colorsData", getCompiledColors($scope.colorData) );

      //  ESPAÑOL
      $scope.form.append("name_es", $scope.name_es[0].text );
      $scope.form.append("url_es", _getCleanUrl($scope.name_es[0].text));
      $scope.form.append("tags_es", _addTags($scope.tags_es));      // MINUSCULAS
      $scope.form.append("description_es", document.getElementById('description_es').value);


      //   ENGLISH
      $scope.form.append("name_en", $scope.name_en[0].text);
      $scope.form.append("url_en", _getCleanUrl($scope.name_en[0].text));
      $scope.form.append("tags_en", _addTags($scope.tags_en));      // MINUSCULAS
      $scope.form.append("description_en", document.getElementById('description_en').value);

      //Send form
      sendForm($scope.form)
      //$scope.uploadForm();

      }

      //'POST', '/api/works'

/*      function sendForm () {
        $http({
          method : 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': localStorage.getItem('myApp_token')
          },
          url : '/api/works',
          data : $scope.form
        })
      }*/

        function sendForm (formDat) {
          var xhr = new XMLHttpRequest();
          
          xhr.open('POST', '/api/works');
          xhr.setRequestHeader("x-access-token", localStorage.getItem('myApp_token'));

          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //cleanScope()
            }
          };
          xhr.send(formDat);
        }


      $scope.chargeGroupData = function () {
          setTimeout(function(){
            $http.get('/api/es/group/' + $scope.group[0].text + '/exact/' ).then((data) => {
              if(data.data.length > 0){
                $scope.bucket = [{ text :  data.data[0].bucket }]
                $scope.name_es = [{ text :  data.data[0].name.es }]
                $scope.name_en = [{ text :  data.data[0].name.en }]
                $scope.tags_es = _getTagsGroup(data.data[0].tags.es)
                $scope.tags_en = _getTagsGroup(data.data[0].tags.en)
                $('#description_es').val(data.data[0].description.es)
                $('#description_en').val(data.data[0].description.en)
              }
              else if(data.data.length === 0) {
                $scope.bucket = []
                $scope.name_es = []
                $scope.name_en = []
                $scope.tags_es = []
                $scope.tags_en = []
                $('#description_es').val('')
                $('#description_en').val('')              
              }
            })
          }, 10)

          function _getTagsGroup (array) {         
            var _arrTmp = []

            for (var i = 0; i < array.length; i++) {
              _arrTmp.push({ text : array[i] })
              if(i === array.length-1) {
                return _arrTmp
              }
            }
          }
      }


      $scope.loadGroup = function (url, $query) {
        //Collections

        return $http.get(url + $query).then((data) => {
          return data
        })

       // return grupo
        //return []      
      }





      $scope.loadItems = function (url, $query) {
          //Collections
          console.log($query);
          return $scope.loadTags(url, $query)
          return []
      }

      $scope.loadTags = function(url, query) {

          return $http.get(url + query);
          
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

      function _addTags (objectArray) {
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
  })

})()



