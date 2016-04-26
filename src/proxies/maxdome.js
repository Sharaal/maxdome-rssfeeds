import request from 'request';

export default (config) => async () => {
  return new Promise((resolve) => {
    const options = {
      url: 'https://heimdall.maxdome.de/interfacemanager-2.1/mxd/assets?filter[]=%type%&filter[]=new&filter[]=notUnlisted&sort[]=activeLicenseStart~desc&filter[]=%area%&appid=%appid%&apikey=%apikey%'
        .replace('%appid%', config.appid)
        .replace('%apikey%', config.apikey)
        .replace('%area%', { package: 'hasPackageContent', store: 'availableWithoutPackage'}[config.area])
        .replace('%type%', { movies: 'movies', series: 'seasons' }[config.type]),
      headers: { clienttype: config.clienttype, 'Maxdome-Origin': 'de', Accept: 'application/json' }
    };
    request(options, (error, response, body) => {
      const items = JSON.parse(body).assetList.map((asset) => {
        return {
          guid: asset.id,
          title: asset.title,
          link: { package: 'http://www.maxdome.de/%assetId%', store: 'http://store.maxdome.de/%assetId%'}[config.area].replace('%assetId%', asset.id),
          description: asset.descriptionShort
        };
      });
      resolve(items);
    });
  });
};
