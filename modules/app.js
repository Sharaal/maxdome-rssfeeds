"use strict";

/*
 * Express initialization and application service for a lightweight webserver
 * @example
    app: {
        path: __dirname + '/web/',
        port: process.env.PORT
    }
 */

module.exports = function (config, libraries, services) {
    var express = libraries.express;

    var app = express();
    if (config.path) {
        app.use(express.static(config.path));
    }
    app.listen(config.port);

    services.app = app;
};
