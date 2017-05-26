require('dotenv-safe').config();

const app = require('express')();
app.disable('x-powered-by');
app.engine('twig', require('swig').renderFile);
app.set('views', require('path').join(__dirname, '../views'));

require('@dnode/middlewares')(app, []);

const maxdome = require('@dnode/request-maxdome').getRequestBuilder({
  maxdomeOptions: {
    apikey: process.env.MAXDOME_APIKEY,
    appid: process.env.MAXDOME_APPID,
    hostname: process.env.MAXDOME_HOSTNAME,
    protocol: process.env.MAXDOME_PROTOCOL,
  },
});
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
