import { ObjectId } from 'mongodb';

export default (_id, { name, age, yearsActive, genre }) => {
  return db.collection('artists')
    .findOneAndUpdate({ _id: ObjectId(_id) }, {
      $set: {
        name,
        genre,
        yearsActive: parseInt(yearsActive),
        age: parseInt(age)
      }
    });
};
