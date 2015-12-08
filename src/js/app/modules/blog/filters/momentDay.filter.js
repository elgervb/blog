/* global angular, moment */
angular.module('blog').filter('momentDay', () => {
  return (date) => {
    if (!date) {
      return date;
    }
    return moment(date).format('D');
  };
});
