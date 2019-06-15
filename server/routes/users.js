const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Get all Users
router.get("/", (req,res)=> {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});
//Get User By ID
router.get('/:id', (req,res) => {
       User 
        find(req.params.id)
        .then(users =>{
            
            res.status(200).json(users);
        } )
        .catch(err => res.status(404).send("Couldn't find that user"));
})
//Adds a new User
router.post('/', (req,res) => {
    const user = new User(req.body);
    User
        .save(user)
        .then(user => {
           res.status(200).json(user);
        })
        .catch(err => res.status(404).send("something went wrong adding a user"));
})
//Updates an existing user
router.put('/:id', (req,res) => {
    
    User
        .findByIdAndUpdate(req.params.id)
        .then(user => {
            if(!user) res.status(404).send();
            res.status(202).json(user);
        })
        .catch(err => res.status(500).send("did not put"));    
        })
router.delete("/:id", (req,res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(user =>{
            if(user) res.status(302).send();
            res.status(404).json(user);
        })
        .catch(err => res.status(500).send("Won't delete"));
})


module.exports  = router;