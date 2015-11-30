/* global angular, moment */
angular.module('blog').filter('momentDay', () => {
  return function(date) {
    if (!date) {
      return date;
    }
    return moment(date).format('D');
  };
});
