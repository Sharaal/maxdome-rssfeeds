const co = require('co');
const Heimdall = require('mxd-heimdall').Heimdall;
const Koa = require('koa');
const render = require('koa-swig');

const app = new Koa();
app.context.render = co.wrap(render({ writeBody: false }));
const router = require('./router.js')({
  heimdall: new Heimdall({
    apikey: process.env.HEIMDALL_APIKEY,
    appid: process.env.HEIMDALL_APPID
  }),
  rssfeeds: require('./rssfeeds.js')
});
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(process.env.PORT);
