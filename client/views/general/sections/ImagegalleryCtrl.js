'use strict';

angular.module('mcmacular-app')
 .controller('imagegalleryCtrl', ['$scope', function($scope){

   function initialize(){
     $('.img-holder').imageScroll({
       image: null,
       imageAttribute: 'image',
       container: $('#sections'),
       windowObject: $(window),
       speed:0.2,
       coverRatio: 0.67,
       holderMinHeight: 100,
       holderMaxHeight: null,
       extraHeight: 0,
       mediaWidth: 1600,
       mediaHeight: 900,
       parallax: true,
       touch: false,
       imgClass: 'img-holder-img'
     });

   }
   initialize();


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
