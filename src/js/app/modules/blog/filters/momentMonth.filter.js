/* global angular, moment */
angular.module('blog').filter('momentMonth', () => {
  return function(date, asString) {
    if (!date) {
      return date;
    }
    return moment(date).format(asString ? 'MMM' : 'M');
  };
});
