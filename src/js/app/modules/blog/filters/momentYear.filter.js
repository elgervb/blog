/* global angular, moment */
angular.module('blog').filter('momentYear', () => {
  return function(date) {
    if (!date) {
      return date;
    }
    return moment(date).format('YYYY');
  };
});
