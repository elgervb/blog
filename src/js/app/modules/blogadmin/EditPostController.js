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
    
     PostsService.edit($scope.post).then((res) => {
      $log.info(`add post ${res.data.title}`);
    })
    .catch(() => {
      $log.error('failed to add post');
    });
    
    $log.info('edit post');
  };
  
});
