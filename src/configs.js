const configs = {
  maxdome: (title, config) => {
    return {
      channel: {
        link: { package: 'http://www.maxdome.de', store: 'http://store.maxdome.de'}[config.area],
        title,
        ttl: 10
      },
      route: '/' + config.area + '-' + config.type,
      proxy: { name: 'maxdome', config }
    }
  }
};

export default [
  configs.maxdome('Neue Serien im Paket', { area: 'package', type: 'series' }),
  configs.maxdome('Neue Filme im Paket', { area: 'package', type: 'movies' }),
  configs.maxdome('Neue Serien im Store', { area: 'store', type: 'series' }),
  configs.maxdome('Neue Filme im Store', { area: 'store', type: 'movies' })
];
