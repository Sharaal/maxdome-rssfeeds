"use strict";

/*
 * Provide the name and version of the app in the views
 * @example
    app: { path: __dirname + '/package.json' }
 */

module.exports = function (config, libraries, services) {
    var app = services.app;

    var json = require(config.path);
    app.locals.app = {
        name: json.name,
        version: json.version
    };
};
