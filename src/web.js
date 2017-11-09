require('@dnode/env');
require('@dnode/express')(async app => {
  require('@dnode/swig')({ app });

  let cache;
  const imdbApiKey = process.env.IMDB_API_KEY;
  if (imdbApiKey) {
    cache = require('@dnode/cache')(require('@dnode/redis')(process.env.REDIS_URL));
  }
  const maxdome = require('@dnode/request-maxdome')();
  const rssfeeds = require('./rssfeeds')();

  require('@dnode/controllers')(app, [
    require('./controllers/home')({ rssfeeds }),
    require('./controllers/rssfeed')({ maxdome, cache, imdbApiKey, rssfeeds }),
  ]);
});
