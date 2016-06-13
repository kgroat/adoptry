var moduleName = require('./moduleName');
var _ = require('underscore');

var defaults = [ { key: 'zip', value: '' }
               , { key: 'animal', value: '' }
               , { key: 'size', value: '' }
               , { key: 'sex', value: '' }
               , { key: 'age', value: '' }
               ];

function mapKey(key){
  return '_data_' + key;
}

angular.module(moduleName)
.provider('storage', function() {

  var data = getData();

  function getData(){
    var localData = {};

    _.each(defaults, function(defaultVal){
      var key = mapKey(defaultVal.key);
      var value = localStorage.getItem(key);
      if(value === null){
        value = defaultVal.value;
      }
      localData[key] = value;
    });

    return localData;
  }

  function getValue(key){
    return data[mapKey(key)];
  }

  function setValue(key, value){
    key = mapKey(key);
    data[key] = value;
    localStorage.setItem(key, value);
    return value;
  }

  function clear(){
    localStorage.clear();
    data = getData();
  }
  
  var storage = {
    get: getValue,
    set: setValue,
    clear: clear
  };

  this.$get = function(){
    return storage;
  }
});