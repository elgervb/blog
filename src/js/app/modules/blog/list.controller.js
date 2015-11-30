/* global angular */
/**
 * Main blog controller
 */
angular.module('blog').controller('list', ($scope, $log, PostsService) => {

  PostsService.list().then((res) => {
    $scope.posts = res.data;
  }).catch((res) => {
    $log.error(res);
    $scope.err = 'Failed to fetch links';
  });

});
