/* global angular */
angular.module('blog.shared').controller('postMessageController', ($scope, $window, $log) => {
  
  $scope.message = 'My Message';
  
  $scope.sendMessage = () => {
    window.postMessage($scope.message, $window.location.origin);
  };
  
  /*
    * The actual postMessage code 
    */
  let listener = (e) => {
    $log.info('Caught ', e.type, ' event from ', e.source.self, ' to ', e.target, ' origin ', e.origin, ' with data ', e.data, '. Full details: ', e);
  };

  let addToFrame = (el) => {
    let frames = el.querySelectorAll('iframe');
    let ifrm = 0;
    let i;
    for (i = 0; i < frames.length; i++) {
      frames[i].contentWindow.addEventListener('message', listener, true);
      ifrm = ifrm + addToFrame(frames[i].contentWindow.document);
    }
    return i + ifrm;
  };

  window.addEventListener('message', listener, true);
  let c = addToFrame(document);
  $log.info('Recursively added listener to main window and', c, 'frames');
});
