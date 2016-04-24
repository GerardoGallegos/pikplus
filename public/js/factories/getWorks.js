
(function(){
'use strict'

/*  works.js    
 ******************************************************************
*/

angular.module('App.Factory.GetWorks', [])

.factory('$works', _getWorks)

function _getWorks($resource){
  return $resource('http://localhost:3000/api/works/:id')
}

})()







