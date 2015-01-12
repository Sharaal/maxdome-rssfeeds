"use strict";

/**
 * Service with the parser to crawl the new assets of a maxdome S4 catalogue page
 * @example
    maxdome: {}
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
                            cache[item.guid] = item.description;
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
