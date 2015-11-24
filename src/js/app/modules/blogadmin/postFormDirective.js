/* global angular */

angular.module('blog').directive('postForm', () => {
  
  return {
    restrict: 'E',
    templateUrl: 'modules/blogadmin/postFormDirective.html',
    scope: {
      post: '=',
      submit: '='
    }
  };
});
