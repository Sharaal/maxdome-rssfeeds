const app = new require('koa')();
app.context.render = require('co').wrap(require('koa-swig')({ writeBody: false }));
const heimdall = require('mxd-heimdall').heimdall({
  apikey: process.env.HEIMDALL_APIKEY,
  appid: process.env.HEIMDALL_APPID
});
const router = require('./router.js')({
  heimdall,
  rssfeeds: require('./rssfeeds.js')
});
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(process.env.PORT);
