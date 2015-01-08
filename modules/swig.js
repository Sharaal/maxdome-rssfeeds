"use strict";

/*
 * Swig express integration
 * @example
    swig: { views: __dirname + '/views/' }
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        swig = libraries.swig;

    app.engine('xml', swig.renderFile);
    app.set('view engine', 'xml');
    app.set('views', config.views);
};
