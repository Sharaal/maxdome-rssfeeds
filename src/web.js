require('dotenv-safe').config();

const app = require('express')();
app.disable('x-powered-by');
app.engine('twig', require('swig').renderFile);

require('@dnode/middlewares')(app, []);

const maxdome = require('@dnode/request-maxdome').getRequestBuilder();
const rssfeeds = require('./rssfeeds');

require('@dnode/controllers')(app, [
  require('./controllers/home')({ rssfeeds }),
  require('./controllers/rssfeed')({ maxdome, rssfeeds }),
]);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
