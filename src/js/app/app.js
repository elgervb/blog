/* global angular */
angular.module('blogapp', ['ui.router', 'templates', 'blog', 'blog.admin'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
  
  // CSRF protection
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'modules/blog/blog.html',
      controller: 'blog'
    })
    .state('main.details', {
      url: 'post/:postId',
      templateUrl: 'modules/blog/details.html',
      controller: 'details'
    })
    
    // Admin
    .state('admin', {
      url: '/admin',
      template: '<div ui-view class="fill-height"></div>'
    })
      .state('admin.posts', {
        url: '/posts',
        templateUrl: 'modules/blog.admin/posts.html',
        controller: 'PostsController'
      })
        .state('admin.posts.add', {
          url: '/add',
          templateUrl: 'modules/blog.admin/addPost.html',
          controller: 'AddPostController'
        })
        .state('admin.posts.edit', {
          url: '/edit/:postId',
          templateUrl: 'modules/blog.admin/editPost.html',
          controller: 'EditPostController'
        });

  $locationProvider.html5Mode('true');

})

.constant('BaseUrl', '/api'); // proxy to http://localhost:4011 in gulpfile in devmode
