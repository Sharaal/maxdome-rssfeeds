/* eslint no-param-reassign: "off" */

import imdb from 'imdb-api';
import { AssetsQuery } from 'mxd-heimdall';
import KoaRouter from 'koa-router';

export default ({ cache, heimdall, rssfeeds }) => {
  const router = new KoaRouter();

  router.get('/', async (ctx) => {
    ctx.body = await ctx.render('index.html.twig', { rssfeeds });
  });

  router
    .param('rssfeed', async (key, ctx, next) => {
      if (rssfeeds[key]) {
        ctx.rssfeed = rssfeeds[key];
        await next();
      } else {
        ctx.status = 404;
      }
    })
    .get('/:rssfeed', async (ctx) => {
      const rssfeed = ctx.rssfeed;

      const query = (new AssetsQuery())
        .filter('new')
        .filter('notUnlisted')
        .filter({ package: 'hasPackageContent', store: 'availableWithoutPackage' }[rssfeed.area])
        .filter({ movies: 'movies', seasons: 'seasons' }[rssfeed.type])
        .sort('activeLicenseStart', 'desc');
      const assets = await heimdall.getAssets(query);

      const items = [];
      for (const asset of assets) {
        let rating;
        if (process.env.IMDB_RATING) {
          rating = await cache(
            `IMDB_RATING:${asset.id}`,
            () => new Promise((resolve) => {
              const originalTitle = asset.title
                .replace(' (Hot from the US)', '')
                .replace(/ \(Season .*\)/, '');
              imdb.get(originalTitle, (err, data) => {
                if (err) {
                  resolve('N/A');
                } else {
                  resolve(data.rating);
                }
              });
            }),
            process.env.IMDB_RATING_EXPIRE
          );
        }
        const link = { package: 'http://www.maxdome.de/', store: 'http://store.maxdome.de/' }[rssfeed.area] + asset.id;
        items.push({
          guid: link,
          title: asset.title + (rating && rating !== 'N/A' ? ` (${rating})` : ''),
          description: asset.description,
          link: link,
        });
      }

      ctx.body = await ctx.render(
        'rssfeed.xml.twig',
        {
          channel: rssfeed.channel,
          items,
          link: `${ctx.req.secure ? 'https' : 'http'}://${ctx.request.header.host}${ctx.request.url}`,
        }
      );
      ctx.type = 'application/rss+xml';
    });

  return router;
};
