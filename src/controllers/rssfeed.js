const AssetsQueryOptions = require('@dnode/request-maxdome').AssetsQueryOptions;

module.exports = ({ maxdome, rssfeeds }) => [
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
        .addFilter(
          { package: 'hasPackageContent', store: 'availableWithoutPackage' }[
            rssfeed.area
          ]
        )
        .addFilter({ movies: 'movies', seasons: 'seasons' }[rssfeed.type])
        .addSort('activeLicenseStart', 'desc');

      const assets = await maxdome.request('assets').send(assetsQueryOptions);

      const items = assets.map(asset => ({
        guid: asset.link,
        title: asset.title,
        description: asset.description,
        link: asset.link,
      }));

      res.set('Content-Type', 'application/rss+xml');
      const host = req.get('host');
      let url = '';
      if (req.originalUrl !== '/') {
        url = req.originalUrl;
      }
      res.render('rssfeed.xml.twig', {
        channel: rssfeed.channel,
        host,
        items,
        url,
      });
    },
  ],
];
