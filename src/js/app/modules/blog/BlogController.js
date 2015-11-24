/* global angular */
/**
 * Main controller
 */
angular.module('blog').controller('BlogController', ($scope) => {

  $scope.divider = '+';
  
  /**
   * Change the divider between Gulp and AngularJS
   * @param {string} divider The devider between gulpJS and angularJS
   * @return {void}
   */
  $scope.changeDivider = (divider) => {
    $scope.divider = divider;
  };

});
