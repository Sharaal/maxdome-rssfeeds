module.exports = ({ maxdome, rssfeeds }) => [
  'get',
  [
    '/',
    async (req, res) => {
      const host = req.get('host');
      let link = '';
      if (req.originalUrl !== '/') {
        link = req.originalUrl;
      }
      res.render('home.html.twig', { host, link, rssfeeds });
    },
  ],
];
