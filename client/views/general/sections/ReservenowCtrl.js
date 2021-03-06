'use strict';

angular.module('mcmacular-app')
 .controller('reservenowCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope){
   $scope.activeItem = 'Select Fit';
   $scope.activeItemc= 'Choose Color';

   $scope.colors = ['Beige', 'Black', 'Charcoal'];
   $scope.fits = ['Modern Slim', 'Classical Straight'];
   $scope.sizees = {
     waist: ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '40'],
     lengthh: ['28','30', '32', '34', '36', '38']
   };

   $scope.setActiveItemc = function(val){
     $scope.activeItemc = val;
   };

   $scope.setActiveItem = function(val){
     $scope.activeItem = val;
   };

   $scope.setActiveItemsizew = function(val){
     $scope.activesizewaist = val;
   };
   $scope.setActiveItemsizel = function(val){
     $scope.activesizelen = val;

   };
    //initiate an array to hold all active tabs
    $scope.activeTabs = [];

    //check if the tab is active
    $scope.isOpenTab = function (tab) {
        //check if this tab is already in the activeTabs array
        if ($scope.activeTabs.indexOf(tab) > -1) {
            //if so, return true
            return true;
        } else {
            //if not, return false
            return false;
        }
    };
    //function to 'open' a tab
    $scope.openTab = function (tab) {
        //check if tab is already open
        if ($scope.isOpenTab(tab)) {
            //if it is, remove it from the activeTabs array
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            //if it's not, add it!
            $scope.activeTabs.push(tab);
        }
    };
    $scope.closeTab = function(tab){
      $scope.activeTabs.pop(tab);
    };
   $scope.reservenow = function(){
     var fitinfo = $scope.activeItem;
     var sizewaist = $scope.activesizewaist;
     var sizelength = $scope.activesizelen;
     var colorc = $scope.activeItemc;

     if((fitinfo === 'Select Fit') || (sizewaist === undefined) || (sizelength === undefined) ||(colorc === 'Choose Color')){
       $scope.errorsizefit = 'Select color, fit waist,length and size!';
     }else{
       $scope.errorsizefit = null;
       $('#myModal').modal('show');
     }
   };
   $scope.tocheckout = function(){
     if((!$rootScope.user) || ($rootScope.user === 'undefined')){
       $rootScope.loggedin = true;
       $rootScope.tocheckoutpage = true;
     }else
     {
       $('#myModal').modal('hide');
       $('body').removeClass('modal-open');
       $( '.modal-backdrop' ).remove();
       $state.go('checkout');
     }
     $rootScope.sizex = [$scope.activeItem, $scope.activesizewaist, $scope.activesizelen, $scope.activeItemc];
   };
   $scope.progressData = [{
       'fund': 'General',
       'total': '300',
       'remaining': '256',
       'link': '#general'
   }];   
 }]);
 angular.module('mcmacular-app').directive('selectable', function () {
     return {
         restrict: 'A',
         link: function (scope, element, attrs) {
             element.bind('click', function(e) {
               $('.active').each(function() {
                 $(this).removeClass('active');
               });
               element.addClass('active');
               scope.$apply(attrs.selectable);
             });
         }
     };
 });
