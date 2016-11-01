import { ObjectId } from 'mongodb';

export default _ids => {
  const objectIds = _ids.map(_id => {
    return { _id: ObjectId(_id) };
  });

  return db.collection('artists')
    .updateMany({ $or: objectIds }, { $set: { retired: true } });
};
