/* global angular */
/**
 * Main admin controller
 */
angular.module('blog.admin').controller('PostsController', ($scope, $log, PostsService) => {
  
  
  PostsService.drafts().then((res) => {
    $scope.drafts = res.data;
  }).catch((res) => {
    $log.error(res);
    $scope.err = 'Failed to fetch drafts';
  });
  
  PostsService.list().then((res) => {
    $scope.posts = res.data;
  }).catch((res) => {
    $log.error(res);
    $scope.err = 'Failed to fetch posts';
  });
 
  /**
   * Listen for selection changes and make changes to the blog menu
   */
  $scope.$on('selectionChanged', (event, args) => {
    $scope.selected = args.postId;
  });
});
