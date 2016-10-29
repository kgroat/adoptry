var moduleName = require('./moduleName');

angular.module(moduleName)
.factory('location', function($cordovaGeolocation) {
  function get(){
    return $cordovaGeolocation.getCurrentPosition({
      timeout: 3000,
      maximumAge: 5000,
      enableHighAccuracy: true
    });
  }

  return {
    get: get
  }
});