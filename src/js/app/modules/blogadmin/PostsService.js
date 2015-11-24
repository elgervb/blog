/* global angular */
angular.module('blog').service('PostsService', ($http, BaseUrl) => {
  return {
    get: () => {
      return $http({
        method: 'GET',
        url: `${BaseUrl}/api/posts`
      })
    }
  };
});
