module.exports = ({ maxdome, rssfeeds }) => [
  'get',
  [
    '/',
    async (req, res) => {
      res.render('home.html.twig', { rssfeeds });
    },
  ],
];
