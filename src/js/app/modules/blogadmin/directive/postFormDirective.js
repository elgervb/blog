/* global angular */

angular.module('blog').directive('postForm', () => {
  
  return {
    restrict: 'E',
    templateUrl: 'modules/blogadmin/directive/postFormDirective.html',
    scope: {
      post: '=',
      submit: '='
    }
  };
});
