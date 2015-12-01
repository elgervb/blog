/* global angular */
angular.module('blog.shared').controller('guidController', ($scope) => {
  
  
  let createGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0;
      let v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  $scope.generate = () => {
    $scope.guid = createGUID();
  };
});
