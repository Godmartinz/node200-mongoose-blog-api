const express = require('express');
const router = express.Router();
const User = require('../models/Blog');

//Get all Blogs
router.get('/', (req,res) =>{
   Blog
    .find()
    .then(blogs => {
        res.status(200).json(blogs); 
    })
})
//Get all Featured Blogs
router.get('/featured', (req,res) =>{
    Blog
    .where('featured')
    .then(blogs => {
        res.status(200).json(blogs); 
    })
    .catch(err => res.status(404).send("No featured Blogs found."));
})
//Get single Blog
router.get('/:id', (req,res) =>{
    Blog
    .findById(req.params.id)
    .then(blogs => {
        // if(!user) res.status(404).send();
        res.status(200).json(blogs); 
    })
    .catch(err => res.status(404).send("Couldnt find that blog"));
})
//Create a Blog and assign a User
router.post('/', (req,res) =>{
   let tempuser= null;
   User.findById(req.body.author)
    .then(user => {
        
        dbUser= user;
        const blogEntry= new Blog(req.body);
        blogEntry.author= user._id;
        return blogEntry.save();
    }).then(blog =>{
        tempuser.blogs.push(blog);
        tempuser.save().then(() => res.status(201).json(blog));
    })
    .catch(err => res.status(404).send("Couldnt find that blog"));
});
