/* global angular, clearInterval */
angular.module('blog.shared').controller('vibrationController', ($scope, $window) => {
  
  $scope.isSupported = () => {
    return !!$window.navigator.vibrate;
  };
  
  $scope.singleVibration = () => {
    if ($window.navigator.vibrate) {
      $window.navigator.vibrate(200);
    }
  };
  
  $scope.multipleVibration = () => {
    if ($window.navigator.vibrate) {
      $window.navigator.vibrate([200, 100, 200]);
    }
  };
  
});
