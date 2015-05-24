'use strict';

angular.module('mcmacular-app')
  .controller('UsersCtrl', ['$rootScope', '$scope', '$state', '$auth', '$window', function($rootScope, $scope, $state, $auth, $window){
    $scope.name = 'Login';
    $scope.isregisteruser = function(){
      $scope.name = 'Register';
    };
    function login(response){
      $window.localStorage.user = JSON.stringify(response.data.user);
      $rootScope.user = response.data.user;
      $state.go('home');
      if($rootScope.tocheckoutpage){
        $('#myModal').modal('hide');
        $('body').removeClass('modal-open');
        $( '.modal-backdrop' ).remove();
        $state.go('checkout');
      }
    }
    $scope.authenticate = function(provider){
      $auth.authenticate(provider)
      .then(login);
    };
    $scope.submit = function(userinfo){
      if($scope.name === 'Register'){
        if((userinfo.password1 === userinfo.password2) && (userinfo.email)){
          $auth.signup({email:userinfo.email, password:userinfo.password1})
          .then(login);
        }else{
          userinfo.password1 = userinfo.password2 = '';
        }
      }else{
        $auth.login({email:userinfo.email, password:userinfo.password})
        .then(login);
      }
    };
  }]);
