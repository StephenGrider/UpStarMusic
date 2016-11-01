import faker from 'faker';

export default (artistProps) => {
  const { name, age, yearsActive, genre } = artistProps;

  return db.collection('artists').insertOne({
    name,
    genre,
    age: parseInt(age),
    yearsActive: parseInt(yearsActive),
    image: faker.image.avatar(),
    albums: []
  });
};
