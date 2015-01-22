"use strict";

/**
 * Serve the homepage with the overview about all rss feeds
 * @example
    homepage: {}
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        language = services.language;

    app.get(
        '/:language?',
        function (req, res, next) {
            language(req, res, next, req.params.language);
        },
        function (req, res) {
            res.render('homepage.twig', config);
        }
    );
};
