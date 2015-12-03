/* global angular */

angular.module('blog.admin').directive('postForm', () => {
  
  return {
    restrict: 'E',
    templateUrl: 'modules/blog.admin/directive/postForm.directive.html',
    scope: {
      post: '=',
      submit: '='
    },
    link: (scope) => {
      let original;
      
      // watch for async changes
      let unwatch = scope.$watch(() => {
        return scope.post;
      }, (value) => {
        // run only when value is set and original not
        if (value && !original) {
          original = angular.copy(value);
          // set the original value only once, unwatch this when set
          unwatch();
        }
      });
      
      scope.cancel = () => {
        scope.post = angular.copy(original); // must copy this, as otherwise we will get a pointer to original an thus updating it
        scope.form.$setPristine();
      };
      
      /**
       * Submit the form
       * @param {object} post the post object
       * @param {Form} form the angular form object
       * @return {void}
       */
      scope.submitForm = (post, form) => {
        // update the original value
        original = angular.copy(post);
        // calling the provided submit callback
        if (typeof scope.submit === 'function') {
          scope.submit(post, form);
        }
      };
    }
  };
});
