const fetch = require('node-fetch');

module.exports = ({ redis, maxdome, flashbriefingUrl }) => [
  'post',
  [
    '/flashbriefings',
    async (req, res) => {
      let latestFlashbriefing = (await redis.lrange('FLASHBRIEFINGS', 0, 0))[0];
      if (latestFlashbriefing) {
        latestFlashbriefing = JSON.parse(latestFlashbriefing);
      }

      const currentFlashbriefing = await fetch(flashbriefingUrl)
        .then(res => res.json());

      if (!latestFlashbriefing || latestFlashbriefing.uid !== currentFlashbriefing.uid) {
        await redis.lpush('FLASHBRIEFINGS', JSON.stringify(currentFlashbriefing));
      }

      res.sendStatus(200);
    },
  ],
];
