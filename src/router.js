import KoaRouter from 'koa-router';

export default ({ rssfeeds, proxy }) => {
  const router = new KoaRouter();

  router.get('/', async (ctx) => {
    ctx.body = await ctx.render('index.html.twig', { rssfeeds });
  });

  for (const rssfeed of rssfeeds) {
    router.get(rssfeed.route, async (ctx) => {
      ctx.body = await ctx.render('rssfeed.xml.twig', { channel: rssfeed.channel, items: await proxy(rssfeed.proxy) });
    });
  }

  return router;
};
