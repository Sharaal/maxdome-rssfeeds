'use strict';

module.exports = (rssfeed, maxdome) => {
  return ['get', [rssfeed.route, (req, res) => {
    maxdome(rssfeed, (items) => {
      res.render('rssfeed.xml.twig', { channel: { title: rssfeed.title, link: rssfeed.host + rssfeed.path }, items });
    });
  }]];
};
