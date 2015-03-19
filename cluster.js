"use strict";

// Cluster the application depends on the environment

require('throng')(
    function () { require('./app'); },
    {
        workers: process.env.WEB_CONCURRENCY,
        lifetime: Infinity
    }
);
