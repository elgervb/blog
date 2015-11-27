/* global angular */

angular.module('blog.admin').directive('postForm', () => {
  
  return {
    restrict: 'E',
    templateUrl: 'modules/blog.admin/directive/postFormDirective.html',
    scope: {
      post: '=',
      submit: '='
    }
  };
});
