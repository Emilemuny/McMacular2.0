'use strict';

angular.module('mcmacular-app')
  .controller('prelaunchCtrl', ['$rootScope', '$scope', '$window', '$state', 'vip', '$location', function($rootScope, $scope, $window, $state, vip, $location){
    if ($rootScope.vipuser) {
      $state.go('home');
    }
    function login(response) {
      $window.localStorage.vipuser = JSON.stringify(response.data.vipuser);
      $rootScope.vipuser = $window.localStorage.vipuser;
      if ($rootScope.vipuser) {
        $state.go('home');
      } else {
        $location.path('prelaunch');
      }
    }
    $scope.submit = function(vipuser) {
      vip.login(vipuser)
      .then(login);
    };
  }]);
