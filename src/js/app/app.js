/* global angular */
/**
 * Declaration of the main skeleton app
 */
angular.module('blog', ['ui.router', 'templates'])

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
      templateUrl: 'modules/blog/addPosts.html',
      controller: 'AddPostsController'
    });

  $locationProvider.html5Mode('true');

});
