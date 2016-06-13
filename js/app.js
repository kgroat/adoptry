require('angular-md5');

var app = angular.module('adoptry', [
  'ionic',
  'ionic.service.core',
  'angular-md5',
  require('./directives/index'),
  require('./controllers/index'),
  require('./services/index')])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('default', {
    url: '/default',
    controller: 'DefaultCtrl'
  })
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'controllers/welcome/template.html',
    controller: 'WelcomeCtrl'
  })
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
  .state('app.petList', {
    url: '/pets',
    views: {
      'menuContent': {
        templateUrl: 'controllers/petList/template.html',
        controller: 'PetListCtrl'
      }
    }
  })
  .state('app.petListFilter', {
    url: '/filter',
    views: {
      'menuContent': {
        templateUrl: 'controllers/petListFilter/template.html',
        controller: 'PetListFilterCtrl'
      }
    }
  })
  .state('app.randomPetDetails', {
    url: '/pet/random',
    views: {
      'menuContent': {
        templateUrl: 'controllers/petDetails/template.html',
        controller: 'PetDetailsCtrl'
      }
    }
  })
  .state('app.petDetailsNamed', {
    url: '/pet/:id/:name',
    views: {
      'menuContent': {
        templateUrl: 'controllers/petDetails/template.html',
        controller: 'PetDetailsCtrl'
      }
    }
  })
  .state('app.petDetails', {
    url: '/pet/:id',
    views: {
      'menuContent': {
        templateUrl: 'controllers/petDetails/template.html',
        controller: 'PetDetailsCtrl'
      }
    }
  })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'controllers/settings/template.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'controllers/about/template.html',
        controller: 'AboutCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/default');

});
