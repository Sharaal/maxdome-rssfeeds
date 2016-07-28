const AssetsQuery = require('mxd-heimdall').AssetsQuery;

module.exports = ({ heimdall, rssfeeds }) => {
  const router = new require('koa-router')();

  router.get('/', async ctx => {
    ctx.body = await ctx.render('index.html.twig', { rssfeeds });
  });

  for (const rssfeed of rssfeeds) {
    router.get(rssfeed.route, async ctx => {
      const query = (new AssetsQuery())
        .filter('new')
        .filter('notUnlisted')
        .filter({ package: 'hasPackageContent', store: 'availableWithoutPackage' }[rssfeed.area])
        .filter({ movies: 'movies', seasons: 'seasons' }[rssfeed.type])
        .sort('activeLicenseStart', 'desc');
      const assets = await heimdall(query);
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
  }

  return router;
};
