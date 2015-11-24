/* global angular */
/**
 * Main blog controller
 */
angular.module('blog').controller('EditPostController', ($scope, $log, $stateParams, PostsService) => {

  $scope.isSubmitted = false;
  
  $scope.$emit('selectionChanged', {postId: $stateParams.postId});
  
  PostsService.get($stateParams.postId).then((res) => {
    $scope.post = res.data;
  }).catch((res) => {
    $log.error(res);
  });
  
  $scope.editPost = () => {
    $scope.isSubmitted = true;
    $log.info('edit post');
  };
  
});
