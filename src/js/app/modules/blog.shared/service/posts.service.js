/* global angular */
angular.module('blog.shared').service('PostsService', ($http, BaseUrl) => {
  return {
    add: (post) => {
      return $http({
        method: 'POST',
        cache: true,
        url: `${BaseUrl}/posts`,
        data: {post}
      });
    },
    edit: (post) => {
      return $http({
        method: 'PUT',
        cache: true,
        url: `${BaseUrl}/posts/${post.id}`,
        data: {post}
      });
    },
    get: (postId) => {
      return $http({
        method: 'GET',
        cache: true,
        url: `${BaseUrl}/posts/${postId}`
      });
    },
    list: () => {
      return $http({
        method: 'GET',
        cache: true,
        url: `${BaseUrl}/posts`
      });
    },
    drafts: () => {
      return $http({
        method: 'GET',
        cache: true,
        url: `${BaseUrl}/posts/drafts`
      });
    }
  };
});
