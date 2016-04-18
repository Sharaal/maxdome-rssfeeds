'use strict';

const async = require('async');
const Crawler = require('crawler');

let crawl = (url, callback) => {
  new Crawler({ callback: (err, res, $) => { callback($); } }).queue(url);
};
module.exports = (dcache) => {
  return (rssfeed, callback) => {
    dcache('items:' + rssfeed.route, (callback) => {
      crawl(rssfeed.host + rssfeed.path, ($) => {
        let items = [];
        let parallels = [];
        $('ul.module-s4--covers div[data-react-props]').each((i, div) => {
          let props = $(div).data('react-props');
          let item = { guid: props.asset.id, title: props.asset.title, link: rssfeed.host + '/' + props.asset.id };
          items.push(item);
          parallels.push((callback) => {
            dcache(
              'item:' + item.guid,
              (callback) => { crawl(item.link, ($) => { callback({ description: $('meta[property="og:description"]').attr('content') }); }); },
              (value) => { item.description = value.description; callback(); },
              60 * 60 * 24 * 30
            );
          });
        });
        async.parallel(parallels, () => { callback(items); });
      });
    }, callback, 60 * 60);
  };
};
