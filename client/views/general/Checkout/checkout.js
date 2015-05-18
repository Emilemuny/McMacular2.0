'use strict';

angular.module('mcmacular-app')

.controller('CheckoutCtrl', ['$scope' , 'Customer', '$state', function($scope, Customer, $state){
  $scope.submitshipping = function(shipping){
    if(shipping.sameasbilling){
      $scope.billing = shipping;
    }
    $('.column.column1').css('background-color','#efefef');
    $('.column.column1').css('opacity','0.2');

    Customer.saveshipping(shipping).then(function(response){
      console.log('Response**', response);

    });

  };
  $scope.submitbilling = function(billing){
    alert('Billing all good');
    $scope.billinginfo = billing;
  };
  $scope.handleStripe = function (code, result) {
    if (result.error) {

      $scope.carderror = result.error.message;
    } else {
      $scope.tknid = result.id;
      $('.column.column2').css('background-color','#efefef');
      $('.column.column2').css('opacity','0.2');
    }
  };
  $scope.chargenow = function(){
    var moreinfo = ($scope.billinginfo === undefined) ? $scope.billing : $scope.billinginfo;
    var paymentinfo = {
       token: $scope.tknid,
       info: moreinfo
    };
    Customer.chargecard(paymentinfo).then(function(response){
       $state.go('home');
      console.log('Charge response from server', response);
    });
  };

}]);
