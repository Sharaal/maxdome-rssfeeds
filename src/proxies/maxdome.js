import request from 'request';

export default (config) => async () => {
  return new Promise((resolve) => {
    const options = {
      url: 'https://heimdall.maxdome.de/interfacemanager-2.1/mxd/assets?' +
        [
          'apikey=f6cb16de3b67b8b9d64d047a00a9dc55',
          'appid=4a5fa26b',
          'filter[]=new',
          'filter[]=notUnlisted',
          'filter[]=' + { package: 'hasPackageContent', store: 'availableWithoutPackage'}[config.area],
          'filter[]=' + { movies: 'movies', series: 'seasons' }[config.type],
          'sort[]=activeLicenseStart~desc'
        ].join('&'),
      headers: { accept: 'application/json', clienttype: 'Webportal', 'maxdome-origin': 'de' }
    };
    request(options, (error, response, body) => {
      const items = JSON.parse(body).assetList.map((asset) => {
        return {
          description: asset.descriptionShort,
          guid: asset.id,
          link: { package: 'http://www.maxdome.de/%assetId%', store: 'http://store.maxdome.de/%assetId%'}[config.area].replace('%assetId%', asset.id),
          title: asset.title
        };
      });
      resolve(items);
    });
  });
};
