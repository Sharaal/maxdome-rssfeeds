'use strict';

module.exports = (rssfeeds) => {
  return ['get', ['/', (req, res) => {
    res.render('index.html.twig', { rssfeeds });
  }]];
};
