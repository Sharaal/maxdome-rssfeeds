import co from 'co';
import Koa from 'koa';
import render from 'koa-swig';

import RssfeedsRouter from './routers/rssfeeds.js';

const app = new Koa();
app.context.render = co.wrap(render({ root: 'views' }));
const rssfeedsRouter = RssfeedsRouter();
app
  .use(rssfeedsRouter.routes())
  .use(rssfeedsRouter.allowedMethods());
app.listen(process.env.PORT);
