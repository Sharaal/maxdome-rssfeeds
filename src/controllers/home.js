module.exports = ({ maxdome, rssfeeds }) => [
  'get',
  [
    '/',
    async (req, res) => {
      const host = req.get('host');
      let url = '';
      if (req.originalUrl !== '/') {
        url = req.originalUrl;
      }
      res.render('home.html.twig', { host, url, rssfeeds });
    },
  ],
];
