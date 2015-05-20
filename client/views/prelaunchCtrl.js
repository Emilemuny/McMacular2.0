'use strict';

angular.module('mcmacular-app')
  .controller('prelaunchCtrl', ['$rootScope', '$scope', '$window', '$state', 'vip', '$location', function($rootScope, $scope, $window, $state, vip, $location){
    if ($rootScope.vipuser) {
      $state.go('home');
    }
    function login(response) {
      console.log('USER', response);
      $window.localStorage.vipuser = JSON.stringify(response.data.user);
      $rootScope.vipuser = $window.localStorage.vipuser;
      console.log('vipuser', $rootScope.vipuser);

      if ($rootScope.vipuser) {
        $state.go('home');
      } else {
        $location.path('prelaunch');
      }
    }
    $scope.submit = function(user) {
      vip.login(user)
      .then(login);
    };
  }]);
