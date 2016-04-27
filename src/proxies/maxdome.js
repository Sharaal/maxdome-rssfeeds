import request from 'request';

export default (config) => async () => {
  return new Promise((resolve) => {
    const options = {
      url: 'https://heimdall.maxdome.de/interfacemanager-2.1/mxd/assets?' +
        [
          'apikey=' + process.env.MAXDOME_APIKEY,
          'appid=' + process.env.MAXDOME_APPID,
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
