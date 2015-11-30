/* global angular */
/**
 * Main blog controller
 */
angular.module('blog').controller('details', ($scope, $log, $stateParams, PostsService) => {

  PostsService.get($stateParams.postId).then((res) => {
    $scope.post = res.data;
  }).catch((res) => {
    $log.error(res);
    $scope.err = 'Failed to fetch post';
  });

});
