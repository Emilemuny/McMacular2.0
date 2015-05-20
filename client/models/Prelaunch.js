'use strict';

angular.module('mcmacular-app')
  .factory('vip', ['$http', function($http){

     function login(user){
       return $http.post('/vip', user);
     }


    return {login:login};
  }]);
