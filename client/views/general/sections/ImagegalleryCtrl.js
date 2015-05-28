'use strict';

angular.module('mcmacular-app')
 .controller('imagegalleryCtrl', ['$scope', function($scope){

   $scope.photos = [
     {src: '../../images/McMacular-frontview.jpg', desc: 'McMacular front-view beige'},

     {src:'../../images/user/product-images/side-view/two-feet-horizontal-distant_black.jpg', desc:'McMacular black '},

     {src:'../../images/McMacular-backview.jpg', desc: 'McMacular back-view'},

     {src:'../../images/user/product-images/Front-Tapered-Fit/front-tapered_charcoal.jpg', desc:'McMacular charchoal'},

     {src:'../../images/McMacular-sideview.jpg', desc: 'McMacular side-view'},

     {src:'../../images/user/product-images/side-view/two-feet-horizontal-distant_black.jpg', desc:'McMacular black'},

     {src:'../../images/McMacular-two-feet_beige.jpg', desc: 'McMacular side-view'},

     {src:'../../images/user/product-images/Pants-Backside/pants-back_charcoal.jpg', desc:'McMacular charcoal'}

    //  {src:'../../images/', desc:'McMacular '},
     //
    //  {src:'../../images/', desc:'McMacular '},
     //
    //  {src:'../../images/', desc:'McMacular '},
     //
    //  {src:'../../images/', desc:'McMacular '},



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
