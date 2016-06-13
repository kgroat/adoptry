
var moduleName = require('./moduleName');
angular.module(moduleName, [ require('./carousel/directive')
                           , require('./validate/directive')
                           ]);

module.exports = moduleName;