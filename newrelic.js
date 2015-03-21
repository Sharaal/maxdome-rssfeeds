'use strict';

// Configuration for the New Relic Node.js agent

exports.config = {
    app_name: process.env.NEW_RELIC_APP_NAME || 'app',
    logging: {
        filepath: process.env.NEW_RELIC_LOG || 'stdout'
    }
};
