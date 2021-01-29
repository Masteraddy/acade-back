const mongoose = require("mongoose");

function schemaModel(definition, name) {
  const Schema = new mongoose.Schema(definition);
  const Model = mongoose.model(name, Schema);
  return Model;
}

module.exports = schemaModel;
