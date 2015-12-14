/* global angular */
angular.module('blog.shared').controller('pageVisibilityController', ($scope, $window, $log) => {
  
  let hidden, visibilityChange;
  let origTitle = window.document.title; 
  if (typeof document.hidden !== 'undefined') { 
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  let handleVisibilityChange = () => {
    if (document[hidden]) {
      $window.document.title = `(hidden) ${origTitle}`;

    } else {
      $window.document.title = origTitle;
    }
    $log.log(`visibilitychange: set title to ${$window.document.title}`);
  };

  document.addEventListener(visibilityChange, handleVisibilityChange, false);
});
