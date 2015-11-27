/* global angular, moment */
angular.module('blog.admin').filter('momentFormat', () => {
  return function(date, format = 'DD MMM YYYY HH:mm') {
    if (!date) {
      return date;
    }
    return moment(date).format(format);
  };
});
