export default ({ client }) => async (key, fallback, expire) => new Promise((resolve) => {
  client.get(key, async (err, value) => {
    if (value) {
      resolve(value);
    } else {
      const newValue = await fallback();
      resolve(newValue);
      client.set(key, newValue, () => {
        if (expire) {
          client.expire(key, expire);
        }
      });
    }
  });
});
