const { AssetsQueryOptions } = require('@dnode/request-maxdome');
const imdb = require('imdb-api');
const RSS = require('rss');

module.exports = ({ cache, imdbApiKey, maxdome, rssfeeds }) => [
  'get',
  [
    '/:rssfeed',
    async (req, res) => {
      const rssfeed = rssfeeds[req.params.rssfeed];
      if (!rssfeed) {
        res.sendStatus(404);
        return;
      }

      const assetsQueryOptions = new AssetsQueryOptions()
        .addFilter('new')
        .addFilter('notUnlisted')
        .addFilter({ package: 'hasPackageContent', store: 'availableWithoutPackage' }[rssfeed.area])
        .addFilter({ movies: 'movies', seasons: 'seasons' }[rssfeed.type])
        .addSort('activeLicenseStart', 'desc');

      let assets = (await maxdome.request('assets').send(assetsQueryOptions)).filter(asset => {
        const hotFrom = asset.hotFromTheUK || asset.hotFromTheUS;
        if (rssfeed.hotFrom) {
          return hotFrom;
        }
        return !hotFrom;
      });

      if (imdbApiKey) {
        assets = await Promise.all(
          assets.map(async asset => {
            const data = await cache(`IMDB:${asset.id}`, async () => {
              try {
                const search = await imdb.search(
                  { title: asset.searchTitle },
                  { apiKey: imdbApiKey, timeout: imdbApiTimeout }
                );
                if (!search.results.length) {
                  throw new Error('missing search result');
                }
                return await imdb.getById(search.results[0].imdbid, { apiKey: imdbApiKey, timeout: imdbApiTimeout });
              } catch (e) {
                return {};
              }
            });
            if (data.rating && data.rating !== 'N/A') {
              asset.title += ` (${data.rating})`;
            }
            return asset;
          })
        );
      }

      const host = req.get('host');
      let url = '';
      if (req.originalUrl !== '/') {
        url = req.originalUrl;
      }

      const feed = new RSS({
        title: rssfeed.channel.title,
        feed_url: host + url,
        site_url: host,
        ttl: rssfeed.channel.ttl,
      });

      for (const asset of assets) {
        feed.item({
          title: asset.title,
          description: asset.description,
          url: asset.link,
          guid: asset.link,
        });
      }

      res.set('Content-Type', 'application/rss+xml');
      res.send(feed.xml({ indent: true }));
    },
  ],
];
