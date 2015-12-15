/* global angular, clearInterval */
angular.module('blog.shared').controller('batteryController', ($scope, $log) => {
  
  $scope.messages = [];
  
  $scope.isSupported = () => {
    return !!navigator.getBattery;
  };
  
  if ($scope.isSupported()) {
    navigator.getBattery().then((battery) => {
    
      $scope.battery = {};
      
      let updateBattery = () => {
        $scope.$apply(() => {
          $scope.battery.level = battery.level * 100;
          $scope.battery.dischargingTime = battery.dischargingTime;
          $scope.battery.chargingTime = battery.chargingTime;
          $scope.battery.charging = battery.charging;
          $scope.battery.chargingStr = battery.charging ? 'Yes' : 'No';
        });
      };
      
      updateBattery();
      
      $log.info('battery API supported');
      $log.info('level', $scope.battery.level, 'dischargingTime', $scope.battery.dischargingTime);
      
      
      battery.addEventListener('chargingchange', () => {
        updateBattery();
      });
    
      battery.addEventListener('levelchange', () => {
        updateBattery();
      });
    
      battery.addEventListener('chargingtimechange', () => {
        updateBattery();
      });
    
      battery.addEventListener('dischargingtimechange', () => {
        updateBattery();
      });
    });
    
  }
  
});
