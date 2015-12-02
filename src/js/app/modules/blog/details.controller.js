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

});
