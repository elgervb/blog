/* global angular */
angular.module('blog.admin').directive('renderTemplate', ($compile) => {
  return {
    link: (scope, element, attrs) => {
      scope.$watch(
        (innerScope) => {
            // watch the 'renderTemplate' expression for changes
          return innerScope.$eval(attrs.renderTemplate);
        },
        (value) => {
          // when the 'renderTemplate' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
      );
    }
  };
});
