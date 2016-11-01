export default (criteria = {}, sortProperty, offset = 0, limit = 10) => {
  const cursor = db.collection('artists')
    .find(buildQuery(criteria));

  const query = cursor
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit)
    .toArray();

  return Promise.all([query, cursor.count()])
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
};
