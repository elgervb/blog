/* global Notification */
/* global angular */
angular.module('blog.shared').controller('notificationsController', ($scope, $log) => {
  
  $scope.icons = ['img/posts/notifications/undefined.png', 'img/posts/notifications/audio.png', 'img/posts/notifications/notification.png'];
  $scope.title = 'Playing next';
  $scope.message = 'Johnny Cash - Ring of Fire';
  $scope.selectedIcon = $scope.icons[1];
  
  $scope.selectIcon = (iconSrc) => {
    $scope.selectedIcon = iconSrc;
  };
  
  $scope.showNotification = () => {
    let notification;
    if ('Notification' in window) { // check for support
      if (Notification.permission === 'granted') {
        // If it's okay let's create a notification
        notification = new Notification($scope.title, {body: $scope.message, icon: $scope.selectedIcon});
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
          // If the user is okay, let's create a notification
          if (permission === 'granted') {
            notification = new Notification($scope.title, {body: $scope.message, icon: $scope.selectedIcon});
          }
        });
      }
    } else {
      $log.warn('This browser does not support desktop notifications.');
      $scope.error = 'This browser does not support desktop notifications.'; 
    }
  };
});
