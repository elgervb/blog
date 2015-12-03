/* global angular */
angular.module('blog.admin').directive('distractionless', ($document) => {
  return {
    restrict: 'EA',
    transclude: true,
    templateUrl: 'modules/blog.admin/directive/distractionless.directive.html',
    scope: {},
    link: (scope, element) => {
      let ESCAPE_KEY = 27;
      
      element.addClass('distractionless');
      
      scope.toggle = () => {
        element.toggleClass('enabled');
        $document.find('body').toggleClass('distractionless-noscroll');
      };
      
      let close = (e) => {
        if (ESCAPE_KEY === e.keyCode) {
          
          element.removeClass('enabled');
          $document.find('body').removeClass('distractionless-noscroll');
          e.preventDefault();
          e.stopPropagation();
        }
      };
      
      $document.on('keyup', close);
      
      scope.$on('$destroy', () => {
        $document.off('keyup', close);
      });
    }
  };
});
