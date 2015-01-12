"use strict";

/**
 * Service with the parser to crawl the new assets of a maxdome S4 catalogue page
 * @example
    maxdome: {
        cache: true,
        cachelength: 200
    }
 */

module.exports = function (config, libraries, services) {
    var async = libraries.async,
        crawler = services.crawler;

    var cache = {};

    var maxdome = function (parser, callback) {
        crawler(parser.crawlerurl, function (err, $) {
            var parallels = [];
            var items = [];
            $('ul.module-s4--covers > li > div.content').each(function(i, div) {
                div = $(div);
                var a = div.find('a');
                var item = {
                    title: div.data('asset-title'),
                    link: parser.asseturl + a.attr('href'),
                    guid: div.data('asset-id')
                };
                if (cache[item.guid]) {
                    item.description = cache[item.guid];
                } else {
                    parallels.push(function (callback) {
                        crawler(item.link, function (err, $) {
                            item.description = $('meta[property="og:description"]').attr('content');
                            if (config.cache) {
                                cache[item.guid] = item.description;
                                if (config.cachelength) {
                                    while (Object.keys(cache).length > config.cachelength) {
                                        delete cache[Object.keys(cache)[0]];
                                    }
                                }
                            }
                            callback();
                        });
                    });
                }
                items.push(item);
            });
            async.parallel(parallels, function () {
                callback(items);
            });
        });
    };

    services.maxdome = maxdome;
};
