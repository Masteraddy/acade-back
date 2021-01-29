const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staff",
    required: true,
  },
};

module.exports = schemaModel(Definition, "subject");
