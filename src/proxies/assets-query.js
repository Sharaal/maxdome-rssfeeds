module.exports = class {
  constructor(ids) {
    this.queries = [];
    if (ids) {
      this.filter('assetId', ids);
    }
  }

  query(key, value) {
    this.queries.push(`${key}=${encodeURIComponent(value)}`);
    return this;
  }

  param(key, alias, values) {
    let value = alias;
    if (values) {
      if (!Array.isArray(values)) {
        values = [values];
      }
      value += `~${values.join('|')}`;
    }
    return this.query(key, value);
  }

  filter(alias, restrictions) {
    return this.param('filter[]', alias, restrictions);
  }

  sort(alias, order) {
    return this.param('sort[]', alias, order);
  }

  toString() {
    return this.queries.join('&');
  }
};
