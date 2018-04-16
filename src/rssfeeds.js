module.exports = ({ feedTtl }) => {
  function rssfeed({ area, hotFrom, type }) {
    return {
      area,
      hotFrom,
      type,
      channel: {
        title: `Neue ${{ movies: 'Filme', seasons: 'Staffeln' }[type]} im ${{ package: 'Paket', store: 'Store' }[area]}${hotFrom ? ' (Hot from the UK/US)' : ''}`,
        description: `Immer up to date mit allen neuen ${{ movies: 'Filme', seasons: 'Staffeln' }[type]} im ${{ package: 'Paket', store: 'Store' }[area]}${hotFrom ? ' (Hot from the UK/US)' : ''} aus dem maxdome Angebot.`,
        link: {
          package: 'https://www.maxdome.de',
          store: 'https://store.maxdome.de',
        }[area],
        image: '/img/maxdome-logo.jpg',
        ttl: feedTtl,
      },
    };
  }

  return {
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
  }
};
