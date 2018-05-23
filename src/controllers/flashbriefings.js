const duration = require('@dnode/duration');
const RSS = require('rss');

module.exports = ({ redis }) => [
  'get',
  [
    '/flashbriefings',
    async (req, res) => {
      const flashbriefings = (await redis.lrange('FLASHBRIEFINGS', 0, 100) || [])
        .map(flashbriefing => JSON.parse(flashbriefing));

      const host = req.get('host');
      let url = '';
      if (req.originalUrl !== '/') {
        url = req.originalUrl;
      }

      const feed = new RSS({
        title: 'Alexa Flashbriefings von maxdome',
        description: '',
        feed_url: 'http://' + host + url,
        image_url: 'http://' + host + '/img/maxdome-logo.jpg',
        site_url: 'http://' + host,
        ttl: duration('8 hours').asMinutes(),
      });

      for (const flashbriefing of flashbriefings) {
        feed.item({
          title: flashbriefing.titleText,
          description: flashbriefing.mainText,
          url: flashbriefing.redirectionUrl,
        });
      }

      res.set('Content-Type', 'application/rss+xml');
      res.send(feed.xml({ indent: true }));
    },
  ],
];
