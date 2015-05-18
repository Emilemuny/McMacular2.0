'use strict';

angular.module('mcmacular-app')
  .factory('Customer', ['$http', function($http){

     function chargecard(paymentinfo){
       return $http.post('/checkout', paymentinfo);
     }
     function saveshipping(shippinginfo){
       return $http.post('/precheckout', shippinginfo);
     }
    return {chargecard:chargecard, saveshipping};
  }]);
