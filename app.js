"use strict";

// Initialize New Relic Node.js agent

if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY && process.env.NEW_RELIC_LEVEL) {
    require('newrelic');
}

// Load the libraries and modules

var config = {
    libraries: {
        async: require('async'),
        Crawler: require('crawler')
    },
    directory: __dirname + '/modules/',
    modules: {
        npm: [
            [require('dragonnodejs-redis'), {
                client: { uri: process.env.REDISCLOUD_URL },
                json: {},
                cache: { disabled: process.env.CACHE_DISABLED }
            }],
            [require('dragonnodejs-webserver'), {
                app: {
                    port: process.env.PORT,
                    package: __dirname + '/package.json',
                    static: __dirname + '/web/'
                },
                auth: {
                    disabled: process.env.AUTH_DISABLED || !(process.env.AUTH_USER && process.env.AUTH_PASSWORD),
                    realm: process.env.AUTH_REALM,
                    users: function () {
                        var users = {};
                        users[process.env.AUTH_USER] = process.env.AUTH_PASSWORD;
                        return users;
                    }()
                },
                bower: {
                    libraries: ['bootstrap', 'jquery'],
                    path: __dirname + '/'
                },
                header: {
                    'X-UA-Compatible': 'IE=edge,chrome=1',
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                    'X-Powered-By': null
                },
                language: {
                    default: 'en',
                    languages: ['de', 'en'],
                    path: __dirname + '/languages/'
                },
                swig: { views: __dirname + '/views/' }
            }]
        ],
        directory: {
            app: {},
            crawler: {},
            maxdome: {},
            feed: {
                feeds: [
                    {
                        route: '/package-new-series',
                        channel: {
                            name: 'package-new-series',
                            link: 'http://www.maxdome.de/serie/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://www.maxdome.de/serie/neu-bei-maxdome',
                            asseturl: 'http://www.maxdome.de'
                        },
                        cache: 60 * 60
                    },
                    {
                        route: '/package-new-movies',
                        channel: {
                            name: 'package-new-movies',
                            link: 'http://www.maxdome.de/spielfilm/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://www.maxdome.de/spielfilm/neu-bei-maxdome',
                            asseturl: 'http://www.maxdome.de'
                        },
                        cache: 60 * 60
                    },
                    {
                        route: '/store-new-series',
                        channel: {
                            name: 'store-new-series',
                            link: 'http://store.maxdome.de/serie/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://store.maxdome.de/serie/neu-bei-maxdome',
                            asseturl: 'http://store.maxdome.de'
                        },
                        cache: 60 * 60
                    },
                    {
                        route: '/store-new-movies',
                        channel: {
                            name: 'store-new-movies',
                            link: 'http://store.maxdome.de/spielfilm/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://store.maxdome.de/spielfilm/neu-bei-maxdome',
                            asseturl: 'http://store.maxdome.de'
                        },
                        cache: 60 * 60
                    }
                ],
                types: [
                    { url: '/feed', template: 'rss.twig' },
                    { url: '', template: 'html.twig' }
                ]
            },
            homepage: {
                feeds: {
                    'package-new-series': {
                        rss: '/package-new-series/feed/%language%',
                        html: '/package-new-series/%language%'
                    },
                    'package-new-movies': {
                        rss: '/package-new-movies/feed/%language%',
                        html: '/package-new-movies/%language%'
                    },
                    'store-new-series': {
                        rss: '/store-new-series/feed/%language%',
                        html: '/store-new-series/%language%'
                    },
                    'store-new-movies': {
                        rss: '/store-new-movies/feed/%language%',
                        html: '/store-new-movies/%language%'
                    },
                    'maxdome-blog': {
                        rss: 'http://blog.maxdome.de/feed'
                    },
                    'maxdome-news-blog': {
                        rss: 'http://blog.maxdome.de/maxdome-news/feed'
                    }
                }
            }
        }
    }
};
require('dragonnodejs')(config);
