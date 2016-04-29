import rp from 'request-promise';

export default ({ apikey, appid }) => async ({ area, type }) => rp.get({
  url: 'https://heimdall.maxdome.de/interfacemanager-2.1/mxd/assets?' +
    [
      'apikey=' + apikey,
      'appid=' + appid,
      'filter[]=new',
      'filter[]=notUnlisted',
      'filter[]=' + { package: 'hasPackageContent', store: 'availableWithoutPackage'}[area],
      'filter[]=' + { movies: 'movies', seasons: 'seasons' }[type],
      'sort[]=activeLicenseStart~desc'
    ].join('&'),
  headers: { accept: 'application/json', clienttype: 'Webportal', 'maxdome-origin': 'de' },
  json: true,
  transform: (data) => data.assetList.map((asset) => {
    return {
      guid: asset.id,
      title: asset.title,
      description: asset.descriptionShort,
      link: { package: 'http://www.maxdome.de/', store: 'http://store.maxdome.de/'}[area] + asset.id
    };
  })
});
