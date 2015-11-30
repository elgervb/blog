/* global angular */
angular.module('blog').directive('blogHeader', () => {
  return {
    restrict: 'AE',
    scope: {},
    templateUrl: 'modules/blog/directives/header.html'
  };
});
