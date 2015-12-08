/* global angular */
angular.module('blog', ['ngMessages', 'blog.shared'])

.config(($stateProvider, $urlRouterProvider) => {
  
  // For any unmatched url, redirect to /list
  $urlRouterProvider.when('', '/list');
  $urlRouterProvider.when('/', '/list');
  $urlRouterProvider.otherwise('/list');
  
  $stateProvider
  .state('main', {
    abstract: true,
    templateUrl: 'modules/blog/blog.html'
  })
  .state('main.list', {
    url: '/list',
    templateUrl: 'modules/blog/list.html',
    controller: 'list'
  })
  .state('main.details', {
    url: '/post/:postId',
    templateUrl: 'modules/blog/details.html',
    controller: 'details'
  });
});
