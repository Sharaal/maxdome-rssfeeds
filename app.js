"use strict";

// Load the libraries and modules

var config = {
    npm: __dirname + '/node_modules/',
    libraries: {
        nodejs: {},
        npm: {
            async: 'async',
            Crawler: 'crawler'
        }
    },
    directory: __dirname + '/modules/',
    modules: {
        npm: {
            'dragonnodejs-redis': {
                client: (function () {
                    if (process.env.REDISCLOUD_URL) {
                        return { uri: process.env.REDISCLOUD_URL };
                    }
                    return {};
                })(),
                cache: {}
            },
            'dragonnodejs-webserver': {
                app: { port: process.env.PORT },
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
                static: { path: __dirname + '/web/' },
                swig: { views: __dirname + '/views/' }
            }
        },
        directory: {
            crawler: {},
            maxdome: {},
            rss: {
                feeds: [
                    {
                        route: '/package/new-series',
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
                        route: '/package/new-movies',
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
                        route: '/store/new-series',
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
                        route: '/store/new-movies',
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
                ]
            },
            homepage: {
                feeds: {
                    'package-new-series': '/package/new-series/%language%',
                    'package-new-movies': '/package/new-movies/%language%',
                    'store-new-series': '/store/new-series/%language%',
                    'store-new-movies': '/store/new-movies/%language%',
                    'maxdome-blog': 'http://blog.maxdome.de/feed',
                    'maxdome-news-blog': 'http://blog.maxdome.de/maxdome-news/feed'
                }
            }
        }
    }
};
require('dragonnodejs')(config);
