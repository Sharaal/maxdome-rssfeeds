"use strict";

/**
 * Service to crawl the new movies of maxdome
 * @example
    maxdome: { url: 'http://store.maxdome.de' }
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        crawler = services.crawler;

    var maxdome = function (callback) {
        crawler(config.url + '/spielfilm/neu-bei-maxdome', function (err, $) {
            var assets = [];
            $('ul.module-s4--covers > li > div.content').each(function(i, div) {
                div = $(div);
                var a = div.find('a');
                var asset = {
                    id: div.data('asset-id'),
                    title: div.data('asset-title'),
                    href: config.url + a.attr('href')
                };
                assets.push(asset);
            });
            callback(assets);
        });
    };

    var cache = {
        time: null,
        assets: null
    };

    app.get('/', function (req, res) {
        var compare = new Date();
        compare.setHours(compare.getHours() - 1);
        if (cache.time == null || cache.time < compare) {
            maxdome(function (assets) {
                cache.time = new Date();
                cache.assets = assets;
                res.render('rss', { assets: assets });
            });
        } else {
            res.render('rss', { assets: cache.assets });
        }
    });
};
