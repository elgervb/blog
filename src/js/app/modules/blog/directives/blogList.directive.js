/* global angular */
angular.module('blog').directive('blogList', () => {
  return {
    restrict: 'AE',
    scope: {
      posts: '='
    },
    templateUrl: 'modules/blog/directives/list.html'
  };
});
