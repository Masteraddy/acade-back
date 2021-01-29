const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  father_name: {
    type: String,
    required: true,
  },
  father_phone: {
    type: Number,
    required: true,
  },
  father_occupation: {
    type: String,
    required: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  mother_phone: {
    type: Number,
    required: true,
  },
  mother_occupation: {
    type: String,
    required: true,
  },
};

module.exports = schemaModel(Definition, "parent");
