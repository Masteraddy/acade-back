const schemaModel = require("../configs/model");
const mongoose = require("mongoose");

const Definition = {
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  id_number: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  admission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admission",
    required: false,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parent",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
};

module.exports = schemaModel(Definition, "student");
