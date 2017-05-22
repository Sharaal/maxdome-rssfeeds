module.exports = ({ maxdome, rssfeeds }) => [
  'get',
  [
    '/',
    async (req, res) => {
      let link = '';
      if (req.originalUrl !== '/') {
        link = req.originalUrl;
      }
      res.render('home.html.twig', { link, rssfeeds });
    },
  ],
];
