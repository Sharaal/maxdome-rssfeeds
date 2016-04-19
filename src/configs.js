'use strict';

const proxies = {
  maxdome: (config) => {
    return {
      name: 'maxdome',
      config: {
        type: config.type,
        area: config.area,
        appid: '4a5fa26b',
        apikey: 'f6cb16de3b67b8b9d64d047a00a9dc55',
        clienttype: 'Webportal'
      }
    };
  }
};

module.exports = [
  {
    rssfeed: {
      route: '/package-series',
      channel: { title: 'Neue Serien im Paket', link: 'http://www.maxdome.de' }
    },
    proxy: proxies.maxdome({ area: 'package', type: 'series' })
  },
  {
    rssfeed: {
      route: '/package-movies',
      channel: { title: 'Neue Filme im Paket', link: 'http://www.maxdome.de' }
    },
    proxy: proxies.maxdome({ area: 'package', type: 'movies' })
  },
  {
    rssfeed: {
      route: '/store-series',
      channel: { title: 'Neue Serien im Store', link: 'http://store.maxdome.de' }
    },
    proxy: proxies.maxdome({ area: 'store', type: 'series' })
  },
  {
    rssfeed: {
      route: '/store-movies',
      channel: { title: 'Neue Filme im Store', link: 'http://store.maxdome.de' }
    },
    proxy: proxies.maxdome({ area: 'store', type: 'movies' })
  }
];
