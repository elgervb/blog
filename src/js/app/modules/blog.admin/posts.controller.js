/* global angular */
/**
 * Main admin controller
 */
angular.module('blog.admin').controller('PostsController', ($scope, $log, PostsService) => {
  
  PostsService.list().then((res) => {
    $scope.posts = res.data;
  }).catch((res) => {
    $log.error(res);
    $scope.err = 'Failed to fetch links';
  });
 
  /**
   * Listen for selection changes and make changes to the blog menu
   */
  $scope.$on('selectionChanged', (event, args) => {
    $scope.selected = args.postId;
  });
});
