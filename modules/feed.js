"use strict";

/**
 * Serve the rss feeds with the data of the parsers
 * @example
    rss: {
        feeds: [
            {
                route: '',
                channel: {
                    name: '',
                    link: ''
                },
                parser: {
                    service: ''
                },
                cache: 60 * 60
            }
        ]
    }
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        cache = services.cache,
        language = services.language;

    for (var key in config.feeds) {
        for (var subkey in config.types) {
            (function (feed, type) {
                app.get(
                    feed.route + type.url + '/:language?',
                    function (req, res, next) {
                        language(req.params.language, res);
                        next();
                    },
                    function (req, res) {
                        cache(
                            'feed:' + feed.route,
                            function (callback) {
                                services[feed.parser.service](feed.parser, function (items) {
                                    var value = {items: items};
                                    callback(value);
                                });
                            },
                            function (value) {
                                res.render('feed/' + type.template, {channel: feed.channel, items: value.items});
                            },
                            {expire: feed.cache}
                        );
                    }
                );
            })(config.feeds[key], config.types[subkey]);
        }
    }
};
