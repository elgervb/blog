/* global angular */
/**
 * Add post controller
 */
angular.module('blog').controller('AddPostController', ($scope, $log, $state, PostsService) => {

  $scope.isSubmitted = false;
  
  $scope.addPost = () => {
    $scope.isSubmitted = true;
    
    PostsService.add($scope.post).then((res) => {
      $log.info(`add post ${res.data.title}`);
      $scope.posts.push(res.data);
      
       $state.go('admin.posts.edit', {postId: res.data.id});
    })
    .catch(() => {
      $log.error('failed to add post');
    });
    
  };
  
});
