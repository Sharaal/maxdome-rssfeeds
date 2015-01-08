"use strict";

/*
 * Express initialization and application service
 * @example
    app: { port: process.env.PORT }
 */

module.exports = function (config, libraries, services) {
    var express = libraries.express;

    var app = express();
    app.listen(config.port);

    services.app = app;
};
