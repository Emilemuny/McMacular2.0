'use strict';

angular.module('mcmacular-app')
  .factory('vip', ['$http', function($http){

     function login(vipuser){
       return $http.post('/vip', vipuser);
     }

    return {login:login};
  }]);
