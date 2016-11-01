export default () => {
  const minQuery = db.collection('artists')
    .aggregate([
      { $project: { yearsActive: 1 } },
      { $sort: { yearsActive: 1 } },
      { $limit: 1 }
    ])
    .next();

  const maxQuery = db.collection('artists')
    .aggregate([
      { $project: { yearsActive: 1 } },
      { $sort: { yearsActive: -1 } },
      { $limit: 1 }
    ])
    .next();

  return Promise.all([minQuery, maxQuery])
    .then(results => {
      const min = results[0];
      const max = results[1];

      return { min: min.yearsActive, max: max.yearsActive };
    });
};
