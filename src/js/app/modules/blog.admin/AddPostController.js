/* global angular */
/**
 * Add post controller
 */
angular.module('blog.admin').controller('AddPostController', ($scope, $log, $state, PostsService) => {

  $scope.isSubmitted = false;
  
  // no selection
  $scope.$emit('selectionChanged', {postId: ''});
  
  $scope.addPost = (post, form) => {
    $scope.isSubmitted = true;
    
    PostsService.add(post).then((res) => {
      $log.info(`add post ${res.data.title}`);
      $scope.posts.push(res.data);
      form.$setPristine();
      
      $state.go('admin.posts.edit', {postId: res.data.id});
    })
    .catch(() => {
      $log.error('failed to add post');
    });
    
  };
  
});
