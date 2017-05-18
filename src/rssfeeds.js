function rssfeed({ area, type }) {
  return {
    area,
    type,
    channel: {
      title: `Neue ${{ movies: 'Filme', seasons: 'Seasons' }[type]} im ${{ package: 'Paket', store: 'Store' }[area]}`,
      link: {
        package: 'http://www.maxdome.de',
        store: 'http://store.maxdome.de',
      }[area],
      ttl: 10,
    },
  };
}

module.exports = {
  'package-movies': rssfeed({ area: 'package', type: 'movies' }),
  'package-seasons': rssfeed({ area: 'package', type: 'seasons' }),
  'store-movies': rssfeed({ area: 'store', type: 'movies' }),
  'store-seasons': rssfeed({ area: 'store', type: 'seasons' }),
};
