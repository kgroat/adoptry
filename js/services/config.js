var moduleName = require('./moduleName');

var weekInSeconds = 604800;
var dayInSeconds = 86400;

angular.module(moduleName)
.factory('config', function() {

  var deployChannel = 'production';
  var version = '1.0.0';

  var isBrowser = ionic.Platform.is('browser');
  var baseUrl = (isBrowser ? 'http://localhost:3000' : 'https://adoptry.herokuapp.com');
  
  var updateDelay = weekInSeconds;
  if(deployChannel === 'staging'){
    updateDelay = dayInSeconds;
  } else if(deployChannel === 'dev'){
    updateDelay = 0;
  }

  return {
    deployChannel: deployChannel,
    version: version,
    isBrowser: isBrowser,
    baseUrl: baseUrl,
    updateDelay: updateDelay
  };
});