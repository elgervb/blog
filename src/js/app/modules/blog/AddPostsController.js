/* global angular */
/**
 * Main blog controller
 */
angular.module('blog').controller('AddPostsController', ($scope, $log) => {

  $scope.addPost = () => {
    $log.info('add post');
  };
  
});
