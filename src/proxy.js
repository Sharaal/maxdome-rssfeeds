import { AssetsQuery, heimdall } from 'mxd-heimdall';

export default class Proxy {
  constructor({ apikey, appid }) {
    this.heimdall = heimdall({ apikey, appid });
  }

  async getAssets({ area, type }) {
    const query = (new AssetsQuery())
      .filter('new')
      .filter('notUnlisted')
      .filter({ package: 'hasPackageContent', store: 'availableWithoutPackage' }[area])
      .filter({ movies: 'movies', seasons: 'seasons' }[type])
      .sort('activeLicenseStart', 'desc');
    const assets = await this.heimdall(query);
    return assets.map(asset => {
      return {
        guid: asset.id,
        title: asset.title,
        description: asset.description,
        link: { package: 'http://www.maxdome.de/', store: 'http://store.maxdome.de/' }[area] + asset.id
      };
    });
  }
}
