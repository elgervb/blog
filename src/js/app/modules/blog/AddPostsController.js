/* global angular */
/**
 * Main blog controller
 */
angular.module('blog').controller('AddPostsController', ($scope, $log) => {

  $scope.isSubmitted = false;
  
  $scope.addPost = () => {
    $scope.isSubmitted = true;
    $log.info('add post');
  };
  
});
