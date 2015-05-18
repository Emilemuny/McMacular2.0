'use strict';

angular.module('mcmacular-app')

.controller('CheckoutCtrl', ['$scope', '$http', function($scope, $http){
  $scope.submitshipping = function(shipping){
    if(shipping.sameasbilling){
      console.log('TRUE same as billing');
      $scope.billing = shipping;
    }
  };
  $scope.submitbilling = function(billing){
    alert('Billing all good');
    console.log('Billing Info****', billing);
  };


  $scope.handleStripe = function (code, result) {
    if (result.error) {
      window.alert('it failed! error: ' + result.error.message);
    } else {
      window.alert('success! token: ' + result.id);
    }
  };
  





  // $scope.handleStripe = function(status, response){
  //   if(response.error){
  //     console.log('There was an error', response.error);
  //   }else {
  //     $http.post('/save_customer', { token: response.id });
  //   }
  // };
}]);
