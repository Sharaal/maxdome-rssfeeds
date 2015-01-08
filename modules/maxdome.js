"use strict";

/**
 * Service with the parser to crawl the new movies of maxdome
 * @example
    maxdome: {}
 */

module.exports = function (config, libraries, services) {
    var crawler = services.crawler;

    var maxdome = function (parser, callback) {
        crawler(parser.crawlerurl, function (err, $) {
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
            });
            callback(items);
        });
    };

    services.maxdome = maxdome;
};
