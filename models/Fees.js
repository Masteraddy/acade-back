const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  fee_name: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
};

module.exports = schemaModel(Definition, "fee");
