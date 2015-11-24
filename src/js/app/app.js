/* global angular */
/**
 * Declaration of the main skeleton app
 */
angular.module('skeleton', ['ui.router', 'templates'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'modules/blog/main.html',
      controller: 'BlogController'
    })
    .state('add-post', {
      url: '/post/add',
      templateUrl: 'modules/main/main.html',
      controller: 'MainController'
    });

  $locationProvider.html5Mode('true');

});
