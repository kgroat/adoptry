var moduleName = require('./moduleName');

angular.module(moduleName)
.factory('petService', function(httpBase, storage, $q) {

  function buildParams(){
    var animal = storage.get('animal');
    var size = storage.get('size');
    var sex = storage.get('sex');
    var age = storage.get('age');

    var params = {};
    if(animal){
      params.animal = animal;
    }
    if(size){
      params.size = size;
    }
    if(sex){
      params.sex = sex;
    }
    if(age){
      params.age = age;
    }
    return params;
  }

  function getPets(offset){
    var zip = storage.get('zip');
    var url = '/find/' + zip;

    if(offset){
      url += '/' + offset;
    }

    return httpBase.get(url, { params: buildParams() }).then(function(response){
      return response.data;
    });
  }

  function getPet(id){
    var zip = storage.get('zip');
    var append = id;
    if(id === 'random' || !id){
      append = 'random/' + zip
    }
    var url = '/pet/' + append;
    return httpBase.get(url, { params: buildParams() }).then(function(response){
      return response.data;
    });
  }

  return {
    getList: getPets,
    get: getPet
  };
});