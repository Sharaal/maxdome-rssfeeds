'use strict';

module.exports = (configs) => {
  return ['get', ['/', (req, res) => {
    res.render('index.html.twig', { configs });
  }]];
};
