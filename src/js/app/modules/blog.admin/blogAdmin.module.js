/* global angular */
angular.module('blog.admin', ['blog.shared'])

.config(($stateProvider) => {
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: '<div ui-view class="fill-height"></div>'
    })
      .state('admin.posts', {
        url: '/posts',
        templateUrl: 'modules/blog.admin/posts.html',
        controller: 'PostsController'
      })
        .state('admin.posts.add', {
          url: '/add',
          templateUrl: 'modules/blog.admin/addPost.html',
          controller: 'AddPostController'
        })
        .state('admin.posts.edit', {
          url: '/edit/:postId',
          templateUrl: 'modules/blog.admin/editPost.html',
          controller: 'EditPostController'
        });
});
