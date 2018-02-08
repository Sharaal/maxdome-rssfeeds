require('@dnode/env');
require('@dnode/express')(app => {
  app.engine('handlebars', require('express-handlebars')());
  app.set('view engine', 'handlebars');

  let cache, imdb;
  const imdbApiKey = process.env.IMDB_API_KEY;
  if (imdbApiKey) {
    cache = require('@dnode/cache')(require('@dnode/redis')(process.env.REDIS_URL));
    imdb = require('./services/imdb')({
      imdbApiKey,
      imdbApiTimeout: process.env.IMDB_API_TIMEOUT || 5000,
    });
  }
  const maxdome = require('@dnode/request-maxdome').getRequestBuilder();
  const rssfeeds = require('./rssfeeds')();

  require('@dnode/controllers')(app, [
    require('./controllers/home')({ rssfeeds }),
    require('./controllers/rssfeed')({ cache, imdb, maxdome, rssfeeds }),
  ]);
});
