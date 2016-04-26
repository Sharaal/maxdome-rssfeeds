import KoaRouter from 'koa-router';

import configs from '../configs.js';
import IndexController from '../controllers/index.js';
import RssfeedController from '../controllers/rssfeed.js';
import MaxdomeProxy from '../proxies/maxdome.js';

export default () => {
  const router = new KoaRouter();

  router.get('/', IndexController(configs));
  const proxies = { maxdome: MaxdomeProxy };
  for (const config of configs) {
    router.get(config.route, RssfeedController(config.channel, proxies[config.proxy.name](config.proxy.config)));
  }

  return router;
};
