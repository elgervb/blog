/* global angular, moment */
angular.module('blog.admin').filter('momentFromNow', () => {
  return function(date) {
    if (!date) {
      return date;
    }
    let momentDate = moment(date);
    
    if (!momentDate.isValid()) {
      return date; // date is not valid, just return the original
    }
    
    // bring date back to UTC, so we can compare it
    let offset = momentDate.utcOffset();
    if (offset) {
      momentDate.add(offset, 'm');
    }
    return momentDate.from(moment.utc());
  };
});
