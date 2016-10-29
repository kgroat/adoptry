var moduleName = require('./moduleName');
angular.module(moduleName, [])

require('./bluebird');
require('./config');
require('./error');
require('./httpBase');
require('./location');
require('./navigateReplace');
require('./petService');
require('./spinner');
require('./storage');
module.exports = moduleName;