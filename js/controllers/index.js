
var moduleName = require('./moduleName');
angular.module(moduleName, [])

require('./about/controller');
require('./default/controller');
require('./petDetails/controller');
require('./petList/controller');
require('./petListFilter/controller');
require('./settings/controller');
require('./welcome/controller');

module.exports = moduleName;