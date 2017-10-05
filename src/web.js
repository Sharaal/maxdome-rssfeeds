require('@dnode/env');
require('@dnode/express')(app => {
  require('@dnode/swig')({ app });

  const maxdome = require('@dnode/request-maxdome')();
  const rssfeeds = require('./rssfeeds')();

  require('@dnode/controllers')(app, [
    require('./controllers/home')({ rssfeeds }),
    require('./controllers/rssfeed')({ maxdome, rssfeeds }),
  ]);
});
