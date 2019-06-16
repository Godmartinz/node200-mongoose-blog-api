const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all Users
router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});
//Get User By ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id).then(users => {
    if (users) {
      res.status(200).json(users);
    } else res.status(404).send("ERROR: NOT FOUND");
  });
});
//Adds a new User
router.post("/", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  user.save(function(err, user) {
    if (user) {
      res.status(201).send(user);
    } else console.log(err);
  });
  console.log(user);
});

//Updates an existing user
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(user => {
    res.status(204).json(user);
  });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).send("Won't delete"));
});

module.exports = router;
