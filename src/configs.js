const configs = {
  maxdome: (config) => {
    return {
      channel: {
        link: { package: 'http://www.maxdome.de', store: 'http://store.maxdome.de'}[config.area],
        title: 'Neue ' + { movies: 'Filme', series: 'Serien'}[config.type] + ' im ' + { package: 'Paket', store: 'Store'}[config.area],
        ttl: 10
      },
      route: '/' + config.area + '-' + config.type,
      proxy: { name: 'maxdome', config }
    }
  }
};

export default [
  configs.maxdome({ area: 'package', type: 'series' }),
  configs.maxdome({ area: 'package', type: 'movies' }),
  configs.maxdome({ area: 'store', type: 'series' }),
  configs.maxdome({ area: 'store', type: 'movies' })
];
