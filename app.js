"use strict";

// Load the libraries and modules

var config = {
    libraries: {
        npm: {
            async: 'async',
            Crawler: 'crawler'
        }
    },
    directory: __dirname + '/modules/',
    modules: {
        npm: {
            'dragonnodejs-redis': {
                client: { uri: process.env.REDISCLOUD_URL },
                cache: { disabled: process.env.CACHE_DISABLED }
            },
            'dragonnodejs-webserver': {
                app: {
                    port: process.env.PORT,
                    package: __dirname + '/package.json',
                    static: __dirname + '/web/'
                },
                auth: {
                    disabled: process.env.AUTH_DISABLED,
                    realm: process.env.AUTH_REALM,
                    user: process.env.AUTH_USER,
                    password: process.env.AUTH_PASSWORD
                },
                bower: {
                    libraries: ['jquery', 'bootstrap'],
                    path: __dirname + '/bower_components/'
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
            }
        },
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
