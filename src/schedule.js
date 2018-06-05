require('@dnode/env');

const fetch = require('node-fetch');

const AssetOptions = require('@dnode/request-maxdome').AssetOptions;
const redis = require('@dnode/redis')(process.env.REDIS_URL);
const maxdome = require('@dnode/request-maxdome').getRequestBuilder();

(async () => {
  console.log('schedule started');

  if (!process.env.FLASHBRIEFING_URL) {
    console.log('schedule stopped because of missing "FLASHBRIEFING_URL"');
    process.exit(0);
  }

  const flashbriefings = await redis.getJSON('FLASHBRIEFINGS') || [];
  const latestFlashbriefing = flashbriefings[0];

  const currentFlashbriefing = await fetch(process.env.FLASHBRIEFING_URL)
    .then(res => res.json());

  if (!latestFlashbriefing || latestFlashbriefing.uid !== currentFlashbriefing.uid) {
    const assetId = currentFlashbriefing.uid.substr(currentFlashbriefing.uid.lastIndexOf('/') + 1);
    const asset = await maxdome.send(new AssetOptions(assetId));
    if (asset) {
      currentFlashbriefing.asset = {
        id: assetId,
        image: asset.getImage(),
        genres: asset.genres,
      };
    }
    flashbriefings.unshift(currentFlashbriefing);
    await redis.setJSON('FLASHBRIEFINGS', flashbriefings.slice(0, 100));
    console.log('added new flashbriefing: ' + currentFlashbriefing.titleText);
  }

  console.log('schedule finished');
  process.exit(0);
})();
