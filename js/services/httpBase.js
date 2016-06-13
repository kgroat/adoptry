var moduleName = require('./moduleName');

angular.module(moduleName)
.factory('httpBase', function($http, $q, config) {
  function get(url, options){
    options = options || {};
    
    if(url.indexOf('//') < 0){
      if(url.indexOf('/') > 0){
        url = '/' + url
      }
      url = config.baseUrl + url;
    }

    if(typeof options.params === 'string'){
      options.paramSerializer = function(data) { return data; };
    }

    return $http.get(url, options);
  }
  return {
    get: get
  }
});