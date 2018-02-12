const imdb = require('imdb-api');

module.exports = ({ imdbApiKey, imdbApiTimeout }) => async title => {
  try {
    const search = await imdb.search(
      { title: title },
      { apiKey: imdbApiKey, timeout: imdbApiTimeout.milliseconds() }
    );
    if (!search.results.length) {
      throw new Error('missing search result');
    }
    const data = await imdb.getById(search.results[0].imdbid, { apiKey: imdbApiKey, timeout: imdbApiTimeout });
    if (data.rating === 'N/A') {
      delete data.rating;
    }
    return data;
  } catch (e) {
    return {};
  }
};
