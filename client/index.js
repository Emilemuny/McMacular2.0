'use strict';

angular.module('mcmacular-app', ['ui.router', 'satellizer', 'ngMessages', 'ngAnimate', 'ngTouch', 'duScroll'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html'})
      .state('faq', {url:'/faq', templateUrl:'/views/general/faq.html'})
      .state('contact', {url:'/contact', templateUrl:'/views/general/contact.html'})

      .state('register', {url:'/register', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})
      .state('login', {url:'/login', templateUrl:'/views/users/users.html', controller:'UsersCtrl'});

      $authProvider.facebook({clientId: '401463520025702'});
      $authProvider.google({clientId: '208332847084-1amt12mp8bpjk02f7l8101si9scacvat.apps.googleusercontent.com'});
      $authProvider.twitter({url: '/auth/twitter'});
      $authProvider.oauth2({
        name: 'instagram',
        url: 'http://localhost:3333/auth/instagram',
        redirectUri: 'http://localhost:3333',
        clientId: '84bfc810b1da4d31b678b2b528802a8d',
        requiredUrlParams: ['scope'],
        scope: ['basic'],
        scopeDelimiter: '+',
        authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });

  }])
  .run(['$rootScope', '$window', '$auth', function($rootScope, $window, $auth){
    if($auth.isAuthenticated()){
      $rootScope.user = JSON.parse($window.localStorage.user);
    }
  }]);
