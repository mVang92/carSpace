const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  creator: { type: String },
  email: { type: String },
  roles: [{}],
  theme: { type: String },
  backgroundPicture: { type: String },
  votedComments: [{}],
  vehicles: [{
    vehicleName: { type: String },
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    logs: [{
      date: { type: String, required: true },
      mileage: { type: Number, required: true },
      service: { type: String, required: true },
      comment: { type: String }
    }],
    date: { type: Date, default: Date.now }
  }]
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
