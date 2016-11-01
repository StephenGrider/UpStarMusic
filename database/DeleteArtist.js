import { ObjectId } from 'mongodb';

export default (_id) => {
  return db.collection('artists')
    .deleteOne({ _id: ObjectId(_id) });
};
