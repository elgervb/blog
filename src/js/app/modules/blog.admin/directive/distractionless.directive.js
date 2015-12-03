/* global angular */
angular.module('blog.admin').directive('distractionless', ($document) => {
  return {
    restrict: 'EA',
    transclude: true,
    templateUrl: 'modules/blog.admin/directive/distractionless.directive.html',
    scope: {},
    link: (scope, element) => {
      element.addClass('distractionless');
      
      scope.toggle = () => {
        element.toggleClass('enabled');
        $document.find('body').toggleClass('distractionless-noscroll');
      };
    }
  };
});
