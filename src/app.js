const Koa = require('koa');

const app = new Koa();
app.context.render = require('co').wrap(require('koa-swig')({ writeBody: false }));
const router = require('./router.js')({
  heimdall: require('mxd-heimdall').heimdall({
    apikey: process.env.HEIMDALL_APIKEY,
    appid: process.env.HEIMDALL_APPID
  }),
  rssfeeds: require('./rssfeeds.js')
});
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(process.env.PORT);
