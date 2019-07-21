const db = require("../models");
console.log("controller loaded")
// Defining methods for the controller
module.exports = {
  createUserSchema: (req, res) => {
    console.log("Hit createUserSchema")
    db.Vehicle
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  findAllVehiclesForUser: (req, res) => {
    console.log("Hit findAllVehiclesForUser");
    db.Vehicle
      .findOne({ creator: req.params.id })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  findOneVehicle: (req, res) => {
    console.log("Hit findOneVehicle");
    db.Vehicle
      .find(req.query)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  addOneVehicle: (req, res) => {
    console.log("Hit addOneVehicle")
    db.Vehicle
      .findOneAndUpdate(
        { creator: req.params.id },
        { $push: { vehicles: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  updateOneLogForOneVehicle: (req, res) => {
    console.log("Hit updateOneLogForOneVehicle")
    console.log(req.body);
    console.log(req.params.id)
    db.Vehicle
      .findOneAndUpdate(
        { _id: req.params.id },
        { $push: { logs: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    console.log("Hit remove")
    console.log(req.params.id)
    db.Vehicle
      .findById({ _id: req.params.id })
      .then(result => console.log(result))
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};
