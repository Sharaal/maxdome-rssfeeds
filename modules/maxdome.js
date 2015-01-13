"use strict";

/**
 * Service with the parser to crawl the new assets of a maxdome S4 catalogue page
 * @example
    maxdome: {}
 */

module.exports = function (config, libraries, services) {
    var async = libraries.async,
        collection = services.collection,
        crawler = services.crawler;

    var descriptions = collection('descriptions');

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
                    descriptions.findById(item.guid, function (err, cache) {
                        if (cache) {
                            item.description = cache.description;
                            callback();
                        } else {
                            crawler(item.link, function (err, $) {
                                item.description = $('meta[property="og:description"]').attr('content');
                                callback();
                                cache = { _id: item.guid, description: item.description };
                                descriptions.insert(cache, function () {});
                            });
                        }
                    });
                });
            });
            async.parallel(parallels, function () {
                callback(items);
            });
        });
    };

    services.maxdome = maxdome;
};
