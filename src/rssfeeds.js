function rssfeed({ area, type }) {
  return {
    area,
    type,
    route: `/${area}-${type}`,
    channel: {
      title: `Neue ${{ movies: 'Filme', seasons: 'Seasons' }[type]} im ${{ package: 'Paket', store: 'Store' }[area]}`,
      link: { package: 'http://www.maxdome.de', store: 'http://store.maxdome.de' }[area],
      ttl: 10
    }
  };
}

module.exports =
  [
    { area: 'package', type: 'movies' },
    { area: 'package', type: 'seasons' },
    { area: 'store', type: 'movies' },
    { area: 'store', type: 'seasons' }
  ]
  .map(rssfeed);
