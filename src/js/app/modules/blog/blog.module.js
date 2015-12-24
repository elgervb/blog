/* global angular, ga */
(function() {
  
  let module = angular.module('blog', ['ngMessages', 'blog.shared']);

  module.config(($stateProvider, $urlRouterProvider) => {
    // For any unmatched url, redirect to /list
    $urlRouterProvider.when('', '/list');
    $urlRouterProvider.when('/', '/list');
    $urlRouterProvider.otherwise('/list');
    
    $stateProvider
    .state('main', {
      abstract: true,
      templateUrl: 'modules/blog/controllers/blog.html'
    })
    .state('main.list', {
      url: '/list',
      templateUrl: 'modules/blog/controllers/list.html',
      controller: 'list'
    })
    .state('main.details', {
      url: '/post/:postId',
      templateUrl: 'modules/blog/controllers/details.html',
      controller: 'details'
    });
  });

  module.run(($rootScope, $log, $location, $document) => {
    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
      if (fromState && fromState.url && fromState.url !== '^') {
        if (typeof ga !== 'undefined') { 
          ga('set', {
            page: $location.url(),
            title: $document[0].title
          });
        } else {
          $log.log('$stateChangeSuccess', 'Google Analytics for ' + $location.url());
        }
      }
    });
  });
  
})();
