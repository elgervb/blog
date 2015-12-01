/* global angular */
angular.module('blog.shared').controller('guidController', ($scope) => {
  $scope.generate = () => {
    $scope.guid = 'asdf';
  };
});
