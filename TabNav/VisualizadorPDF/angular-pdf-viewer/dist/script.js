angular.module('testApp', ['pdf'])
  .controller('AppCtrl', [
    '$scope',
    'pdfDelegate',
  function($scope, pdfDelegate, $log) {
    $scope.relativity = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/relativity.pdf';
    $scope.material = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/material-design-2.pdf';
    
    $scope.pdfUrl = $scope.material;
}]);