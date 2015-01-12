"use strict";

/**
 * Serve the homepage with the overview about all rss feeds
 * @example
    homepage: {}
 */

module.exports = function (config, libraries, services) {
    var app = services.app;

    app.get('/', function (req, res) {
        res.render('homepage', config);
    });
};
