"use strict";

/**
 * Initialize the app
 * @example
    app: {}
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        language = services.language;

    app.use(function (req, res, next) {
        language(req, res, next, req.params.language);
    });
};
