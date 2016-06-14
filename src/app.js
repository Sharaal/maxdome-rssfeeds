import co from 'co';
import Koa from 'koa';
import render from 'koa-swig';

import Proxy from './proxy.js';
import Router from './router.js';
import rssfeeds from './rssfeeds.js';

const app = new Koa();
app.context.render = co.wrap(render({ writeBody: false }));
const router = new Router().getKoaRouter({
  proxy: new Proxy({ apikey: process.env.MAXDOME_APIKEY, appid: process.env.MAXDOME_APPID }),
  rssfeeds,
});
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(process.env.PORT);
