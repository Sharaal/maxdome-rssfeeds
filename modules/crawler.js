'use strict';

/**
 * Service with the wrapper for the crawler library to crawl an url
 * @example
    crawler: {}
 */

module.exports = function (config, libraries, services) {
    var Crawler = libraries.Crawler;

    var crawler = function (url, callback) {
        new Crawler({
            callback: function (err, res, $) {
                callback(err, $);
            }
        }).queue(url);
    };

    services.crawler = crawler;
};
