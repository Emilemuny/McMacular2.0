'use strict';

angular.module('mcmacular-app')
  .controller('NavCtrl', ['$rootScope', '$scope', '$state', '$window', function($rootScope, $scope, $state, $window){
    $scope.logout = function(){
      delete $rootScope.user;
      $window.localStorage.clear();
      $state.go('home');

    };
  }]);
