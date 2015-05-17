'use strict';

angular.module('mcmacular-app')
  .controller('ScrollCtrl', ['$scope', '$document', function($scope, $document){
    $scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 5000).then(function() {
        console.log('You just scrolled to the top!');
      });
    };
    var section3 = angular.element(document.getElementById('#section3'));
    $scope.toSection3 = function() {
      $document.scrollToElementAnimated(section3);
    };
  }
]).value('duScrollOffset', 30);
