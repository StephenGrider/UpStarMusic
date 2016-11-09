const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.count()])
    .then(([all, count]) => {
      return { all, count, offset, limit };
    });
};

const buildQuery = criteria => {
  let query = {};

  if (criteria.name) {
    query = { ...query, $text: { $search: criteria.name } };
  }

  if (criteria.age) {
    query = { ...query, age: { $gt: criteria.age.min, $lt: criteria.age.max } };
  }

  if (criteria.yearsActive) {
    query = { ...query,
      yearsActive: {
        $gt: criteria.yearsActive.min,
        $lt: criteria.yearsActive.max
      }
    };
  }

  return query;
}
