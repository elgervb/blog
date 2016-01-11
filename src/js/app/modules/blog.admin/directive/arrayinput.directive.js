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
angular.module('blog.admin').directive('arrayinput', ($compile, $document) => {
  
  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      arrayinput: '=',
      addItem: '=',
      ngModel: '='
    },
    link: (scope, el, attrs, ngModelCtrl) => {
      
      let ENTER_KEY = 13;

      // we need to compile the template with the current scope to access it  
      let html = '<a class="btn-add-item" ng-click="addItem()">+</a>';
      el.after($compile(html)(scope));
      
      scope.addItem = () => {
        if (ngModelCtrl.$dirty && ngModelCtrl.$modelValue) {
          if (!angular.isArray(scope.arrayinput)) {
            scope.arrayinput = [];
          }
          if (scope.arrayinput.indexOf(ngModelCtrl.$modelValue) === -1) { // not present
            scope.arrayinput.push(ngModelCtrl.$modelValue);
            
            // reset the field
            ngModelCtrl.$modelValue = '';
            ngModelCtrl.$setViewValue('');
            ngModelCtrl.$render();
            ngModelCtrl.$setPristine();
            scope.ngModel = ''; // overwrite ngModel value
          }
        }
      };
      
      let close = (e) => {
      if (ENTER_KEY === e.keyCode) {
          scope.addItem();
          e.preventDefault();
        }
      };
      
      $document.on('keyup', close);
      
      scope.$on('$destroy', () => {
        $document.off('keyup', close);
      });
    }
  };
});
