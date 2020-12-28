const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  admission_date: {
    type: Date,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classsection",
    required: true,
  },
  admission_no: {
    type: String,
    required: true,
  },
};

module.exports = schemaModel(Definition, "admission");
