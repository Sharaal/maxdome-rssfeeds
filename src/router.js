const AssetsQuery = require('mxd-heimdall').AssetsQuery;
const KoaRouter = require('koa-router');

module.exports = ({ heimdall, rssfeeds }) => {
  const router = new KoaRouter();

  router.get('/', async ctx => {
    ctx.body = await ctx.render('index.html.twig', { rssfeeds });
  });

  router
    .param('rssfeed', async (key, ctx, next) => {
      if (!rssfeeds[key]) {
        return ctx.status = 404;
      }
      ctx.rssfeed = rssfeeds[key];
      await next();
    })
    .get('/:rssfeed', async ctx => {
      const rssfeed = ctx.rssfeed;
      const query = (new AssetsQuery())
        .filter('new')
        .filter('notUnlisted')
        .filter({ package: 'hasPackageContent', store: 'availableWithoutPackage' }[rssfeed.area])
        .filter({ movies: 'movies', seasons: 'seasons' }[rssfeed.type])
        .sort('activeLicenseStart', 'desc');
      const assets = await heimdall.getAssets(query);
      const items = assets.map(asset => {
        return {
          guid: asset.id,
          title: asset.title,
          description: asset.description,
          link: { package: 'http://www.maxdome.de/', store: 'http://store.maxdome.de/' }[rssfeed.area] + asset.id
        };
      });
      ctx.body = await ctx.render('rssfeed.xml.twig', { channel: rssfeed.channel, items });
    });

  return router;
};
