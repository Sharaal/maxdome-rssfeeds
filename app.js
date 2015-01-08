"use strict";

// Load the libraries and modules

var config = {
    npm: __dirname + '/node_modules/',
    libraries: {
        nodejs: {},
        npm: {
            Crawler: 'crawler',
            express: 'express',
            swig: 'swig'
        }
    },
    directory: __dirname + '/modules/',
    modules: {
        npm: {},
        directory: {
            app: { port: process.env.PORT },
            swig: { views: __dirname + '/views/' },
            homepage: {
                title: 'Maxdome RSS Feeds',
                feeds: [
                    {
                        title: 'Maxdome Package New Series',
                        href: '/package/new-series'
                    },
                    {
                        title: 'Maxdome Package New Movies',
                        href: '/package/new-movies'
                    },
                    {
                        title: 'Maxdome Store New Series',
                        href: '/store/new-series'
                    },
                    {
                        title: 'Maxdome Store New Movies',
                        href: '/store/new-movies'
                    }
                ]
            },
            crawler: {},
            maxdome: {},
            rss: {
                feeds: [
                    {
                        route: '/package/new-series',
                        channel: {
                            title: 'Maxdome Package New Series',
                            link: 'http://www.maxdome.de/serie/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://www.maxdome.de/serie/neu-bei-maxdome',
                            asseturl: 'http://www.maxdome.de'
                        },
                        cache: 60
                    },
                    {
                        route: '/package/new-movies',
                        channel: {
                            title: 'Maxdome Package New Movies',
                            link: 'http://www.maxdome.de/spielfilm/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://www.maxdome.de/spielfilm/neu-bei-maxdome',
                            asseturl: 'http://www.maxdome.de'
                        },
                        cache: 60
                    },
                    {
                        route: '/store/new-series',
                        channel: {
                            title: 'Maxdome Store New Series',
                            link: 'http://store.maxdome.de/serie/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://store.maxdome.de/serie/neu-bei-maxdome',
                            asseturl: 'http://store.maxdome.de'
                        },
                        cache: 60
                    },
                    {
                        route: '/store/new-movies',
                        channel: {
                            title: 'Maxdome Store New Movies',
                            link: 'http://store.maxdome.de/spielfilm/neu-bei-maxdome'
                        },
                        parser: {
                            service: 'maxdome',
                            crawlerurl: 'http://store.maxdome.de/spielfilm/neu-bei-maxdome',
                            asseturl: 'http://store.maxdome.de'
                        },
                        cache: 60
                    }
                ]
            }
        }
    }
};
require('dragonnodejs')(config);
