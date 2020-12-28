const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classsection",
    required: false,
  },
  busincharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bus",
    required: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

module.exports = schemaModel(Definition, "staff");
