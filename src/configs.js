'use strict';

const channels = {
  maxdome: (config) => {
    return {
      link: { package: 'http://www.maxdome.de', store: 'http://store.maxdome.de'}[config.area],
      title: config.title,
      ttl: 10
    };
  }
};

const proxies = {
  maxdome: (config) => {
    return {
      name: 'maxdome',
      config: Object.assign(
        { appid: '4a5fa26b', apikey: 'f6cb16de3b67b8b9d64d047a00a9dc55', clienttype: 'Webportal' },
        config
      )
    };
  }
};

module.exports = [
  {
    rssfeed: {
      route: '/package-series',
      channel: channels.maxdome({ area: 'package', title: 'Neue Serien im Paket' })
    },
    proxy: proxies.maxdome({ area: 'package', type: 'series' })
  },
  {
    rssfeed: {
      route: '/package-movies',
      channel: channels.maxdome({ area: 'package', title: 'Neue Filme im Paket' })
    },
    proxy: proxies.maxdome({ area: 'package', type: 'movies' })
  },
  {
    rssfeed: {
      route: '/store-series',
      channel: channels.maxdome({ area: 'store', title: 'Neue Serien im Store' })
    },
    proxy: proxies.maxdome({ area: 'store', type: 'series' })
  },
  {
    rssfeed: {
      route: '/store-movies',
      channel: channels.maxdome({ area: 'store', title: 'Neue Filme im Store' })
    },
    proxy: proxies.maxdome({ area: 'store', type: 'movies' })
  }
];
