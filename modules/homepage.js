"use strict";

/**
 * Serve the homepage with the overview about all rss feeds
 * @example
    homepage: {}
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        bower = services.bower;

    config.bower = bower;

    app.get('/', function (req, res) {
        res.render('homepage', config);
    });
};
