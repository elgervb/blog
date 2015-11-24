/* global angular */
angular.module('blog').service('PostsService', ($http, BaseUrl) => {
  return {
    list: () => {
      return $http({
        method: 'GET',
        url: `${BaseUrl}/api/posts`
      });
    }, 
    get: (postId) => {
       return $http({
        method: 'GET',
        url: `${BaseUrl}/api/posts/${postId}`
      });
    }
  };
});
