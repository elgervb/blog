/* global angular */
/**
 * Main admin controller
 */
angular.module('blog').controller('PostsController', ($scope, $log, PostsService) => {
  
  PostsService.list().then((res) => {
    $scope.posts = res.data;
  }).catch((res) => {
    $log.error(res);
  });
});
