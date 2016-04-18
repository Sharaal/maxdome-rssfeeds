'use strict';

require('dnewrelic');

let app = require('dexpress');
app.use(require('dheaders'));
const dhttpAuth = require('dhttp-auth');
if (dhttpAuth) {
  app.use(dhttpAuth);
}
app.engine('twig', require('swig').renderFile);
let rssfeeds = require('./rssfeeds.js');
let controllers = [require('./controllers/index.js')(rssfeeds)];
let maxdome = require('./proxies/maxdome.js')(require('dcache')(require('dredis')(process.env.REDIS_URL)));
rssfeeds.forEach((rssfeed) => {
  controllers.push(require('./controllers/rssfeed.js')(rssfeed, maxdome));
});
require('dcontrollers')(app, controllers);
