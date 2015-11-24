/* global angular */
/**
 * Declaration of the main skeleton app
 */
angular.module('blog', ['ui.router', 'ngMessages', 'templates'])

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
    
    // Admin
    .state('admin', {
      url: '/admin',
      template: '<div ui-view class="fill-height"></div>'
    })
      .state('admin.posts', {
        url: '/posts',
        templateUrl: 'modules/blogadmin/PostsController.html',
        controller: 'PostsController'
      })
        .state('admin.posts.add', {
          url: '/add',
          templateUrl: 'modules/blogadmin/AddPostController.html',
          controller: 'AddPostController'
        })
        .state('admin.posts.edit', {
          url: '/edit/:postId',
          templateUrl: 'modules/blogadmin/EditPostController.html',
          controller: 'EditPostController'
        });

  $locationProvider.html5Mode('true');

})

.constant('BaseUrl', '/api'); // proxy to http://localhost:4011 in gulpfile in devmode
