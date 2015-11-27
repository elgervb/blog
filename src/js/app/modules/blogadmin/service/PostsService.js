/* global angular */
angular.module('blog').service('PostsService', ($http, BaseUrl) => {
  return {
    add: (post) => {
      return $http({
        method: 'POST',
        url: `${BaseUrl}/posts`,
        data: {post}
      });
    },
    edit: (post) => {
      return $http({
        method: 'PUT',
        url: `${BaseUrl}/posts/${post.id}`,
        data: {post}
      });
    },
    get: (postId) => {
      return $http({
        method: 'GET',
        url: `${BaseUrl}/posts/${postId}`
      });
    },
    list: () => {
      return $http({
        method: 'GET',
        url: `${BaseUrl}/posts`
      });
    }
  };
});
