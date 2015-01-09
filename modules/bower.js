"use strict";

/*
 * Service with the versions of the bower installed libraries
 * @example
    bower: {
        libraries: [],
        path: __dirname + '/bower_components/'
    }
 */

module.exports = function (config, libraries, services) {
    var bower = {};
    for (var key in config.libraries) {
        var name = config.libraries[key];
        bower[name] = require(config.path + name + '/bower.json').version;
    }

    services.bower = bower;
};
