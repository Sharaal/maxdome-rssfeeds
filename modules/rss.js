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
        collection = services.collection,
        language = services.language;

    var feeds = collection('feeds');

    for (var key in config.feeds) {
        (function (feed) {
            app.get(
                feed.route + '/:language?',
                function (req, res, next) {
                    language(req.params.language, res);
                    next();
                },
                function (req, res) {
                    feeds.findById(feed.route, function (err, cache) {
                        var compare = new Date();
                        compare.setMinutes(compare.getMinutes() - feed.cache);
                        if (cache && cache.date > compare) {
                            res.render('rss', { channel: feed.channel, items: cache.items });
                        } else {
                            services[feed.parser.service](feed.parser, function (items) {
                                res.render('rss', { channel: feed.channel, items: items });
                                cache = { _id: feed.route, date: new Date(), items: items };
                                feeds.save(cache, function () {});
                            });
                        }
                    });
                }
            );
        })(config.feeds[key]);
    }
};
