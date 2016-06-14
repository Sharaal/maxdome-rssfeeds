import rp from 'request-promise';

export default class Proxy {
  constructor({ apikey, appid }) {
    this.apikey = apikey;
    this.appid = appid;
  }

  async getAssets({ area, type }) {
    const queryString = [
      `apikey=${this.apikey}`,
      `appid=${this.appid}`,
      'filter[]=new',
      'filter[]=notUnlisted',
      `filter[]=${{ package: 'hasPackageContent', store: 'availableWithoutPackage' }[area]}`,
      `filter[]=${{ movies: 'movies', seasons: 'seasons' }[type]}`,
      'sort[]=activeLicenseStart~desc',
    ].join('&');
    const promise = rp.get({
      url: `https://heimdall.maxdome.de/interfacemanager-2.1/mxd/assets?${queryString}`,
      headers: { accept: 'application/json', clienttype: 'Webportal', 'maxdome-origin': 'de' },
      json: true,
      transform: (data) => data.assetList.map((asset) => {
        let title = asset.title;
        if (asset['@class'] === 'MultiAssetTvSeriesSeason') {
          title += ` (Season ${asset.number})`;
        }
        return {
          title,
          guid: asset.id,
          description: asset.descriptionShort,
          link: { package: 'http://www.maxdome.de/', store: 'http://store.maxdome.de/' }[area] + asset.id,
        };
      }),
    });
    return promise;
  }
}
