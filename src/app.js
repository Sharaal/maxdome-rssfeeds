import co from 'co';
import dotenv from 'dotenv';
import { Heimdall } from 'mxd-heimdall';
import Koa from 'koa';
import redis from 'redis';
import render from 'koa-swig';

import _cache from './cache';
import _router from './router';
import rssfeeds from './rssfeeds';

dotenv.config({ silent: true });

const app = new Koa();
app.context.render = co.wrap(render({ writeBody: false }));
let cache;
if (process.env.IMDB_RATING) {
  const client = redis.createClient(process.env.REDIS_URL);
  cache = _cache({ client });
}
const router = _router({
  cache,
  heimdall: new Heimdall({
    apikey: process.env.HEIMDALL_APIKEY,
    appid: process.env.HEIMDALL_APPID,
  }),
  rssfeeds,
});
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(process.env.PORT);
