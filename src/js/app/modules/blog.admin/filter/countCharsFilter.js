/* global angular */
angular.module('blog.admin').filter('countChars', () => {
  return function(str) {
    if (!str) {
      return 0;
    }
    return str.length;
  };
});
