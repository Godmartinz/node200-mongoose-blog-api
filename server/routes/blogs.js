const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

//Get all Blogs
router.get("/", (req, res) => {
  Blog.find().then(blogs => {
    res.status(200).json(blogs);
  });
});
//Get all Featured Blogs
router.get("/featured", (req, res) => {
  Blog.where({ featured: true })
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(err => res.status(404).send("No featured Blogs found."));
});
//Get single Blog
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then(blogs => {
    if (!blogs) {
      res.status(404).send();
    } else res.status(200).json(blogs);
  });
});
router.post("/", (req,res) => {
//Create a Blog and assign a User
let dbUser = null;
// Fetch the user from the database
User

    .findById(req.body.author)
    .then(user => {
        // Store the fetched user in higher scope variable
        dbUser = user;

        // Create a blog
        const newBlog = new Blog(
            {
                title: req.body.title,
                article: req.body.article,
                published: req.body.published,
                featured: req.body.featured,
                author: req.body.author
            });

        // Bind the user to it
        newBlog.author = user.id;

        // Save it to the database
        return newBlog.save();
    })
    .then(blog => {
        // Push the saved blog to the array of blogs associated with the User
        dbUser.blogs.push(blog);

        // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
        dbUser.save().then(() => res.status(201).json(blog));
    });
});
//updates a blog
router.put("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, {
    $set: {
      title: req.body.title,
      article: req.body.article,
      published: req.body.published,
      featured: req.body.featured
    }
  })
    .exec()
    .then(result => {
      console.log(result);
      res.status(204).send(result);
    })
    .catch(err => console.log(err));
});

// Delete a blog
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndRemove(id)
    .exec()
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(err => {
      res.status(400);
    });
});

module.exports = router;
