"use strict";

/*
 * Swig express integration
 * @example
    swig: { views: __dirname + '/views/' }
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        swig = libraries.swig;

    app.engine('twig', swig.renderFile);
    app.set('view engine', 'twig');

    app.set('views', config.views);
};
