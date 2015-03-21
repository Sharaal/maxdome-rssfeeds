'use strict';

// Initialize New Relic Node.js agent

if (process.env.NEW_RELIC_LICENSE_KEY) {
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
            [require('dragonnodejs-express'), {
                app: {
                    port: process.env.PORT
                },
                auth: {
                    disabled: process.env.AUTH_DISABLED,
                    users: process.env.AUTH_USERS,
                    user: process.env.AUTH_USER,
                    password: process.env.AUTH_PASSWORD,
                    realm: process.env.AUTH_REALM
                },
                header: {
                    'X-UA-Compatible': 'IE=edge,chrome=1',
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                    'X-Powered-By': null
                },
                static: {
                    directory: __dirname + '/web/'
                }
            }],
            [require('dragonnodejs-redis'), {
                client: {
                    uri: process.env.REDISCLOUD_URL
                },
                json: {},
                cache: {
                    disabled: process.env.CACHE_DISABLED
                }
            }],
            [require('dragonnodejs-webserver'), {
                bower: {
                    libraries: ['bootstrap', 'jquery'],
                    path: __dirname + '/'
                },
                language: {
                    default: 'en',
                    languages: ['de', 'en'],
                    path: __dirname + '/languages/'
                },
                package: {
                    path: __dirname + '/package.json'
                },
                swig: {
                    views: __dirname + '/views/'
                }
            }]
        ],
        directory: {
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
