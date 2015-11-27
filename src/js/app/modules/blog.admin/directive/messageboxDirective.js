/* global angular */
/**
 * ## Directive to show a message on screen ##
 * 
 * ### options ###
 * 
 * ***msg***: The (error) message to show to the user
 * ***title***: the optional title of the dialog. Defaults to 'Error'
 *
 * ### example ###
 * ```html
 * <messagebox title="'error'" msg="error"></messagebox>
 * ```
 */
angular.module('blog.admin').directive('messagebox', ($document) => {
  let ESCAPE_KEY = 27;
  
  return {
    restrict: 'E',
    scope: {
      msg: '=',
      title: '='
    },
    link: (scope) => {
      // Add some defaults, when needed...
      if (!scope.title) {
        scope.title = 'Error';
      }
      
      let closeDialog = (e) => {
        if (scope.msg && ESCAPE_KEY === e.keyCode) {
          scope.msg = '';
          scope.$apply();
        }
      };
      
      $document.on('keyup', closeDialog);
      
      scope.$on('$destroy', () => {
        $document.off('keyup', closeDialog);
      });
    
    },
    /* The actual template */
    templateUrl: 'modules/blog.admin/directive/messageboxDirective.html' 
  };
});
