'use strict';

module.exports = (dcache, rssfeed, proxy) => {
  return ['get', [rssfeed.route, (req, res) => {
    const callback = (items) => {
      res.render('rssfeed.xml.twig', { channel: rssfeed.channel, items });
    };
    if (dcache) {
      dcache('items:' + rssfeed.route, proxy, callback, 60 * 60);
    } else {
      proxy(callback);
    }
  }]];
};
