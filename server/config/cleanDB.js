const models = require("../models");
const db = require("../config/connection");

module.exports = async (modelName, collectionName) => {
  try {
    let modelExisit = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExisit.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
