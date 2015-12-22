/* global angular */
/**
 * Main blog controller
 */
angular.module('blog').controller('details', ($scope, $log, $state, $stateParams, PostsService) => {

  PostsService.get($stateParams.postId).then((res) => {
    $scope.post = res.data;
  }).catch((res) => {
    $log.error(res);
    $state.go('main.list');
  });
  
  /**
   * Go to the next post, based on the current post
   * 
   * @param {object} post the current post
   * 
   * @return {undefined}
   */
  $scope.goNext = (post) => {
    if (post.next) {
      $state.go('main.details', {postId: post.next});
    } else {
      $state.go('main.list');
    }
  };
  
  /**
   * Go to the previous post, based on the current post
   * 
   * @param {object} post the current post
   * 
   * @return {undefined}
   */
  $scope.goPrevious = (post) => {
    if (post.previous) {
      $state.go('main.details', {postId: post.previous});
    } else {
      $state.go('main.list');
    }
  };

});
