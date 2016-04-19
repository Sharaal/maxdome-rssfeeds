'use strict';

require('dnewrelic');

let app = require('dexpress');
app.use(require('dheaders'));
const dhttpAuth = require('dhttp-auth');
if (dhttpAuth) {
  app.use(dhttpAuth);
}
app.engine('twig', require('swig').renderFile);
let configs = require('./configs.js');
let controllers = [require('./controllers/index.js')(configs)];
let rssfeed = require('./controllers/rssfeed.js');
let dcache;
if (!process.env.CACHE_DISABLED) {
  dcache = require('dcache')(require('dredis')(process.env.REDIS_URL));
}
let proxies = { maxdome: require('./proxies/maxdome.js') };
configs.forEach((config) => {
  controllers.push(rssfeed(dcache, config.rssfeed, proxies[config.proxy.name](config.proxy.config)));
});
require('dcontrollers')(app, controllers);
