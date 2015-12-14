/* global angular, clearInterval */
angular.module('blog.shared').controller('batteryController', ($scope, $log) => {
  
  $scope.messages = [];
  
  $scope.isSupported = () => {
    return !!navigator.getBattery;
  };
  
  if ($scope.isSupported()) {
    navigator.getBattery().then((battery) => {
    
      $scope.$apply(() => {
        $log.info('battery API supported');
        $log.info('level', battery.level, 'dischargingTime', battery.dischargingTime);
        $scope.battery = battery;
      
        let charging = battery.charging ? 'Yes' : 'No';
        $scope.messages.push(`Battery charging? ${charging}`);
        $scope.messages.push(`Battery level: ${battery.level * 100}%`);
        $scope.messages.push(`Battery charging time: ${battery.chargingTime} seconds`);
        $scope.messages.push(`Battery discharging time: ${battery.dischargingTime} seconds`);
        $log.info($scope.messages);
        battery.addEventListener('chargingchange', () => {
          $scope.$apply(() => {
            $scope.messages.push(`Battery charging? ${charging}`);
          });
        });
      
        battery.addEventListener('levelchange', () => {
          $scope.$apply(() => {
            $scope.messages.push(`Battery level: ${battery.level * 100}%`);
          });
        });
      
        battery.addEventListener('chargingtimechange', () => {
          $scope.$apply(() => {
            $scope.messages.push(`Battery charging time: ${battery.chargingTime} seconds`);
          });
        });
      
        battery.addEventListener('dischargingtimechange', () => {
          $scope.$apply(() => {
            $scope.messages.push(`Battery discharging time: ${battery.dischargingTime} seconds`);
          });
        });
      });
    
    });
  }
  
});
