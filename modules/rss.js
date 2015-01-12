"use strict";

/**
 * Serve the rss feeds with the data of the parsers
 * @example
    rss: {
        feeds: [
            {
                route: '',
                channel: {
                    title: '',
                    description: '',
                    link: ''
                },
                parser: {
                    service: ''
                },
                cache: 60
            }
        ]
    }
 */

module.exports = function (config, libraries, services) {
    var app = services.app,
        language = services.language;

    var caches = {};

    for (var key in config.feeds) {
        (function (feed) {
            app.get(
                feed.route + '/:language?',
                function (req, res, next) {
                    language(res, req.params.language);
                    next();
                },
                function (req, res) {
                    if (feed.cache) {
                        caches[feed.route] = caches[feed.route] || { time: null, items: null };
                        var cache = caches[feed.route];
                        var compare = new Date();
                        compare.setMinutes(compare.getMinutes() - feed.cache);
                        if (cache.time == null || cache.time < compare) {
                            services[feed.parser.service](feed.parser, function (items) {
                                cache.time = new Date();
                                cache.items = items;
                                res.render('rss', { channel: feed.channel, items: items });
                            });
                        } else {
                            res.render('rss', { channel: feed.channel, items: cache.items });
                        }
                    } else {
                        services[feed.parser.service](feed.parser, function (items) {
                            res.render('rss', { channel: feed.channel, items: items });
                        });
                    }
                }
            );
        })(config.feeds[key]);
    }
};
