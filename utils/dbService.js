// utils/dbService.js

// create a single document
const create = (model, data) => {
  return model.create(data); // Mongoose now directly returns a Promise
};

// update a single document and return the updated document
const updateOne = (model, filter, data, options = { new: true }) => {
  return model.findOneAndUpdate(filter, data, options);
};

// delete a single document
const deleteOne = (model, filter) => {
  return model.findOneAndDelete(filter);
};

// update multiple documents and return the count of updated documents
const updateMany = (model, filter, data) => {
  return model.updateMany(filter, data).then(result => result.modifiedCount);
};

// delete multiple documents and return the count of deleted documents
const deleteMany = (model, filter) => {
  return model.deleteMany(filter).then(result => result.deletedCount);
};

// find a single document by filter
const findOne = (model, filter, options = {}) => {
  return model.findOne(filter, options);
};

// find multiple documents by filter
const findMany = (model, filter, options = {}) => {
  return model.find(filter, options);
};

// count documents
const count = (model, filter) => {
  return model.countDocuments(filter);
};

// paginate through documents (ensure you use a plugin like mongoose-paginate if needed)
const paginate = (model, filter, options) => {
  return model.paginate(filter, options);
};

module.exports = {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  count,
  paginate,
};
