import Koa from 'koa';

import Proxy from './proxy.js';
import Router from './router.js';
import rssfeeds from './rssfeeds.js';
import swig from './swig.js';

const app = new Koa();
app.context.render = swig;
const router = Router({ rssfeeds, proxy: Proxy({ apikey: process.env.MAXDOME_APIKEY, appid: process.env.MAXDOME_APPID }) });
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(process.env.PORT);
