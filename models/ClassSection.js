const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
    required: true,
  },
};

module.exports = schemaModel(Definition, "classsection");
