import { ObjectId } from 'mongodb';

export default (id) => {
  return db.collection('artists')
    .findOne({ _id: ObjectId(id) });
};
