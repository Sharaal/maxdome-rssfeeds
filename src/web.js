const duration = require('@dnode/duration');

require('@dnode/env');
require('@dnode/express')((app, express) => {
  app.engine('handlebars', require('express-handlebars').create({
    defaultLayout: 'main',
  }).engine);
  app.set('view engine', 'handlebars');

  require('@dnode/middlewares')(app, [
    express.static('www'),
  ]);

  const redis = require('@dnode/redis')(process.env.REDIS_URL);
  let cache, imdb;
  const imdbApiKey = process.env.IMDB_API_KEY;
  if (imdbApiKey) {
    cache = require('@dnode/cache')(redis);
    imdb = require('./services/imdb')({
      imdbApiKey,
      imdbApiTimeout: duration(process.env.IMDB_API_TIMEOUT || '5 seconds'),
    });
  }
  const maxdome = require('@dnode/request-maxdome').getRequestBuilder();
  const rssfeeds = require('./rssfeeds')({
    feedTtl: duration(process.env.FEED_TTL || '1 hour'),
  });

  require('@dnode/controllers')(app, [
    require('./controllers/home')({ rssfeeds }),
    require('./controllers/flashbriefings/get')({ redis }),
    require('./controllers/flashbriefings/post')({
      redis,
      maxdome,
      flashbriefingUrl: process.env.FLASHBRIEFING_URL,
    }),
    require('./controllers/rssfeed')({ cache, imdb, maxdome, rssfeeds }),
  ]);
});
