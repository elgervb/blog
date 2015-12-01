/* global angular */
angular.module('blog.shared').directive('injectCtrl', ($controller, $compile, $rootScope, $log) => {
  return {
    scope: {
      injectCtrl: '=',
      inject: '='
    },
    compile: (compileElement) => {
      let compileString = compileElement.html();
      // return the linking function
      return (scope, element) => {
        scope.$watch(() => {
          return scope.injectCtrl;
        }, () => {
          if (!scope.injectCtrl) {
            return;
          }
          let newScope = $rootScope.$new();
          if (angular.isObject(scope.inject)) {
            angular.forEach(scope.inject, (value, key) => {
              newScope[key] = value;
            });
          }
          try {
            // pass the scope through controller, as a result it will be exended with controller scope
            $controller(scope.injectCtrl, {$scope: newScope});
          } catch (error) {
            $log.info(`injectCtrl: Could not find controller: ${scope.injectCtrl}`);
          }
          element.html(compileString);
          $compile(element.contents())(newScope);
        });
      };
    }
  };
});
