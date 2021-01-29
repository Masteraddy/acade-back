const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  name: {
    type: String,
    required: true,
  },
  vehicle_no: {
    type: String,
    required: true,
  },
};

module.exports = schemaModel(Definition, "bus");
