(function () {
  'use strict'

  var App = angular.module('App', [
    // Dependencies

    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ngTagsInput',
    'ngTimeAgo',
    'NgSwitchery',
    'angular-loading-bar',
    'satellizer',
    'App.Service.Palette',
    'App.Factory.GetDataAPI',
    // 'App.Factory.GetWorks',
    'App.Controller.Main',
    'App.Controller.Users',
    'App.Controller.Signup',
    'App.Controller.Login',
    'App.Controller.Upload',
    'App.Controller.Works',
    'App.Directive.UserItem',
    'App.Directive.UpZone',
    'App.Directive.ItemWork',
    'App.Directive.ItemWorkDetails',
    'App.Directive.WorkListItem'

  ])

    .config(function ($interpolateProvider, $authProvider, $httpProvider) {
      $interpolateProvider.startSymbol('{[{').endSymbol('}]}')

      $authProvider.httpInterceptor = function () { return true },
      $authProvider.loginUrl = 'http://localhost:3000/api/authenticate'
      $authProvider.signupUrl = 'http://localhost:3000/api/signup'
      $authProvider.tokenName = 'token'
      $authProvider.tokenPrefix = 'myApp'
      $authProvider.authHeader = 'x-access-token'
      $authProvider.storageType = 'localStorage'

      // Interceptor token
      $httpProvider.interceptors.push('httpRequestInterceptor')
    })

    .factory('httpRequestInterceptor', function () {
      return {
        request: function ($config) {
          if (true) {
            $config.headers['x-access-token'] = localStorage.getItem('myApp_token')
            return $config
          }
        }
      }
    })

    .config(function ($routeProvider) {
      $routeProvider

        .when('/works', {
          templateUrl: 'partials/manager-works.html',
          controller: 'WorksController'
        })

        .when('/statistics', {
          templateUrl: 'partials/manager-Statistics.html',
          controller: 'MainController'
        })

        .when('/users', {
          templateUrl: 'partials/manager-users.html',
          controller: 'UsersController'
        })

        .when('/upload', {
          templateUrl: 'partials/manager-upload.html',
          controller: 'UploadController'
        })

        .when('/login', {
          templateUrl: 'partials/manager-login.html',
          controller: 'LoginController'
        })

        .when('/signup', {
          templateUrl: 'partials/manager-signup.html',
          controller: 'SignupController'
        })
    })
})()
