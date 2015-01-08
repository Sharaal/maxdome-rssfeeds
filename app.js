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
            crawler: {},
            swig: { views: __dirname + '/views/' },
            maxdome: { url: 'http://store.maxdome.de' }
        }
    }
};
require('dragonnodejs')(config);
