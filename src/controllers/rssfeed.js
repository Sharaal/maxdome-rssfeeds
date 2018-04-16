const { AssetsQueryOptions } = require('@dnode/request-maxdome');
const imdb = require('imdb-api');
const RSS = require('rss');

module.exports = ({ cache, imdb, maxdome, rssfeeds }) => [
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

      if (imdb) {
        assets = await Promise.all(
          assets.map(async asset => {
            const data = await cache(`IMDB:${asset.id}`, async () => imdb(asset.searchTitle));
            if (data.rating) {
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
        feed_url: 'https://' + host + url,
        image_url: 'https://' + host + rssfeed.channel.image,
        site_url: 'https://' + host,
        ttl: rssfeed.channel.ttl.asMinutes(),
      });

      for (const asset of assets) {
        feed.item({
          title: asset.title,
          description: asset.description,
          url: asset.url,
          categories: asset.genres,
          enclosure: {
            url: asset.getImage().url,
            type: 'image/jpeg',
          },
        });
      }

      res.set('Content-Type', 'application/rss+xml');
      res.send(feed.xml({ indent: true }));
    },
  ],
];
