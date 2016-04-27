import request from 'request';

export default ({ apikey, appid }) => async ({ area, type }) => {
  return new Promise((resolve) => {
    const options = {
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
      headers: { accept: 'application/json', clienttype: 'Webportal', 'maxdome-origin': 'de' }
    };
    request(options, (error, response, body) => {
      const items = JSON.parse(body).assetList.map((asset) => {
        return {
          guid: asset.id,
          title: asset.title,
          description: asset.descriptionShort,
          link:
            { package: 'http://www.maxdome.de/%assetId%', store: 'http://store.maxdome.de/%assetId%'}[area]
              .replace('%assetId%', asset.id)
        };
      });
      resolve(items);
    });
  });
};
