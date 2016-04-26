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
        { apikey: 'f6cb16de3b67b8b9d64d047a00a9dc55', appid: '4a5fa26b', clienttype: 'Webportal' },
        config
      )
    };
  }
};

export default [
  {
    channel: channels.maxdome({ area: 'package', title: 'Neue Serien im Paket' }),
    route: '/package-series',
    proxy: proxies.maxdome({ area: 'package', type: 'series' })
  },
  {
    channel: channels.maxdome({ area: 'package', title: 'Neue Filme im Paket' }),
    route: '/package-movies',
    proxy: proxies.maxdome({ area: 'package', type: 'movies' })
  },
  {
    channel: channels.maxdome({ area: 'store', title: 'Neue Serien im Store' }),
    route: '/store-series',
    proxy: proxies.maxdome({ area: 'store', type: 'series' })
  },
  {
    channel: channels.maxdome({ area: 'store', title: 'Neue Filme im Store' }),
    route: '/store-movies',
    proxy: proxies.maxdome({ area: 'store', type: 'movies' })
  }
];
