require('dotenv-safe').config();

const app = new (require('koa'))();
app.context.render = require('co').wrap(
  require('koa-swig')({ writeBody: false })
);
let cache;
if (process.env.IMDB_RATING) {
  cache = require('./cache')({
    client: require('redis').createClient(process.env.REDIS_URL),
  });
}
const router = require('./router')({
  cache,
  heimdall: new (require('mxd-heimdall').Heimdall)({
    apikey: process.env.HEIMDALL_APIKEY,
    appid: process.env.HEIMDALL_APPID,
  }),
  rssfeeds: require('./rssfeeds'),
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(process.env.PORT);
