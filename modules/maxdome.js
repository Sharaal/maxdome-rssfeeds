"use strict";

/**
 * Service with the parser to crawl the new assets of a maxdome S4 catalogue page
 * @example
    maxdome: {}
 */

module.exports = function (config, libraries, services) {
    var async = libraries.async,
        cache = services.cache,
        crawler = services.crawler;

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
                items.push(item);
                parallels.push(function (callback) {
                    cache(
                        'item:' + item.guid,
                        function (callback) {
                            crawler(item.link, function (err, $) {
                                var value = { description: $('meta[property="og:description"]').attr('content') };
                                callback(value);
                            });
                        },
                        function (value) {
                            item.description = value.description;
                            callback();
                        }
                    );
                });
            });
            async.parallel(parallels, function () {
                callback(items);
            });
        });
    };

    services.maxdome = maxdome;
};
