'use strict';

angular.module('mcmacular-app', ['ui.router', 'satellizer', 'ngMessages', 'ngAnimate', 'ngTouch', 'duScroll', 'angularPayments'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider){

    $urlRouterProvider.otherwise('/vip');

    $stateProvider

      .state('prelaunch',{url:'/vip', templateUrl: '/views/prelaunch.html', controller: 'prelaunchCtrl'})

      .state('home', {url:'/home', templateUrl:'/views/general/home.html'})
      .state('faq', {url:'/faq', templateUrl:'/views/general/faq.html'})
      .state('contact', {url:'/contact', templateUrl:'/views/general/contact.html'})

      .state('checkout', {url:'/checkout', templateUrl: '/views/general/Checkout/checkout.html', controller:'CheckoutCtrl'})

      .state('register', {url:'/register', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})
      .state('login', {url:'/login', templateUrl:'/views/users/users.html', controller:'UsersCtrl'});

      $authProvider.facebook({clientId: '401463520025702'});
      $authProvider.google({clientId: '208332847084-1amt12mp8bpjk02f7l8101si9scacvat.apps.googleusercontent.com'});
      $authProvider.twitter({url: '/auth/twitter'});
      $authProvider.oauth2({
        name: 'instagram',
        url: '/auth/instagram',
        redirectUri: 'http://localhost:3000',
        clientId: '16f7a019eb1240ea9e845c1b3b1ef86f',
        requiredUrlParams: ['scope'],
        scope: ['basic'],
        scopeDelimiter: '+',
        authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });

    window.Stripe.setPublishableKey('pk_test_JGEKrKiQpasBibRuFHFbQ0KK');
  }])
  .run(['$rootScope', '$window', '$auth', function($rootScope, $window, $auth){
    if($auth.isAuthenticated()){
      $rootScope.user = JSON.parse($window.localStorage.user);
    }
    $rootScope.vipuser = $window.localStorage.vipuser;
  }]);
