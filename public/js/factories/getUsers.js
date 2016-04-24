
(function(){
'use strict'

/*  works.js    
 ******************************************************************
*/

angular.module('App.Factory.GetUsers', [])

.factory('$users', function ($resource){
    return $resource('http://localhost:3000/api/users/:id')
})

})()






