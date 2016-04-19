'use strict';

module.exports = (rssfeed, proxy) => {
  return ['get', [rssfeed.route, (req, res) => {
    proxy((items) => {
      res.render('rssfeed.xml.twig', { channel: rssfeed.channel, items });
    });
  }]];
};
