'use strict';

angular.module('angular-prototype')
 .controller('sectionfourCtrl', ['$scope', function($scope){

   $scope.photos = [
     {src: '../../images/McMacular-frontview.jpg', desc: 'McMacular front-view'},
     {src:'../../images/McMacular-backview.jpg', desc: 'McMacular back-view'},
     {src:'../../images/McMacular-sideview.jpg', desc: 'McMacular side-view'},
     {src:'../../images/McMacular-two-feet_beige.jpg', desc: 'McMacular side-view'}
   ];

   $scope._Index = 0;
   $scope.isActive = function(index){
     return $scope._Index === index;
   };

   $scope.showPrev = function(){
     $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
   };

   $scope.showNext = function(){
     $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
   };

   $scope.showPhoto = function(index){
     $scope._Index = index;
   };

 }]);
