'use strict';

angular.module('mcmacular-app')
  .controller('NavCtrl', ['$rootScope', '$scope', '$state', '$window', function($rootScope, $scope, $state, $window){
    $scope.logout = function(){
      delete $rootScope.user;
      $window.localStorage.removeItem('user');
      $state.go('home');
    };

    var container = angular.element(document.getElementById('container'));
    var section2 = angular.element(document.getElementById('#section2'));
    $scope.toTheTop = function() {
      container.scrollTop(0, 5000);
    };
    $scope.toSection2 = function() {
      container.scrollTo(section2, 0, 1000);
    };
  }]);
