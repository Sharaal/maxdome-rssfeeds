require('@dnode/env');

const fetch = require('node-fetch');

const redis = require('@dnode/redis')(process.env.REDIS_URL);
const maxdome = require('@dnode/request-maxdome').getRequestBuilder();

(async () => {
  console.log('schedule started');

  let latestFlashbriefing = (await redis.lrange('FLASHBRIEFINGS', 0, 0))[0];
  if (latestFlashbriefing) {
    latestFlashbriefing = JSON.parse(latestFlashbriefing);
  }

  const currentFlashbriefing = await fetch(process.env.FLASHBRIEFING_URL)
    .then(res => res.json());

  if (!latestFlashbriefing || latestFlashbriefing.uid !== currentFlashbriefing.uid) {
    await redis.lpush('FLASHBRIEFINGS', JSON.stringify(currentFlashbriefing));
    console.log('added new flashbriefing: ' + currentFlashbriefing.titleText);
  }

  console.log('schedule finished');
  process.exit(0);
})();
