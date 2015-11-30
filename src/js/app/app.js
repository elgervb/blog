/* global angular */
angular.module('blog')

/**
 * Configuration: state your routes and other configuration items here
 */
.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'modules/blog/blog.html',
      controller: 'blog'
    })
    
    // Admin
    .state('admin', {
      url: '/admin',
      template: '<div ui-view class="fill-height"></div>'
    })
      .state('admin.posts', {
        url: '/posts',
        templateUrl: 'modules/blog.admin/PostsController.html',
        controller: 'PostsController'
      })
        .state('admin.posts.add', {
          url: '/add',
          templateUrl: 'modules/blog.admin/AddPostController.html',
          controller: 'AddPostController'
        })
        .state('admin.posts.edit', {
          url: '/edit/:postId',
          templateUrl: 'modules/blog.admin/EditPostController.html',
          controller: 'EditPostController'
        });

  $locationProvider.html5Mode('true');

})

.constant('BaseUrl', '/api'); // proxy to http://localhost:4011 in gulpfile in devmode
