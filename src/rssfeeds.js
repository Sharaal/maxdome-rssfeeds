function rssfeed({ area, hotFrom, type }) {
  return {
    area,
    hotFrom,
    type,
    channel: {
      title: `Neue ${{ movies: 'Filme', seasons: 'Seasons' }[type]} im ${{ package: 'Paket', store: 'Store' }[area]}` +
        (hotFrom ? ' (Hot from the UK/US)' : ''),
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
  'package-seasons-hotfrom': rssfeed({
    area: 'package',
    hotFrom: true,
    type: 'seasons',
  }),
  'store-movies': rssfeed({ area: 'store', type: 'movies' }),
  'store-seasons': rssfeed({ area: 'store', type: 'seasons' }),
  'store-seasons-hotfrom': rssfeed({
    area: 'store',
    hotFrom: true,
    type: 'seasons',
  }),
};
