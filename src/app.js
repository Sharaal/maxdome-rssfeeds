import co from 'co';
import dotenv from 'dotenv';
import { Heimdall } from 'mxd-heimdall';
import Koa from 'koa';
import render from 'koa-swig';

import _router from './router';
import rssfeeds from './rssfeeds';

dotenv.config({ silent: true });

const app = new Koa();
app.context.render = co.wrap(render({ writeBody: false }));
const router = _router({
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
