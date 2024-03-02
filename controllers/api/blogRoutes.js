const router = express.Router();
const express = require("express");
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

router.get("/", (req, res => {
  Blog.findAll({include:[User, Comment]})
  .then(dbBlogs => {
    res.json(dbBlogs);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err});
  });

}));

router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id,{include:[User, Comment]})
    .then(dbBkig => {
      res.json(dbBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({msg: "an error occurred", err});
    });
});

router.post('/', (req, res) => {
  if(!req.session.user) {
    return res.status(401).json({msg:"Please login!"})
  } 
    Blog.create({
      title:req.body.title,
      content:req.body.content,
      userId:req.session.user.id
    })
    .then(newBlog => {
      res.json(newBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({msg: "an error occurred", err});
    });
  });

  router.put("/:id", (req, res) => {
    if(!req.session.user) {
      return res.status(401).json({msg:"Please login!"})
    }
    Blog.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(updatedBlog => {
      res.json(updatedBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({msg: "an error occurred", err});
    });
  });

  router.delete("/:id", (req, res) => {
    if(!req.session.user) {
      return res.status(401).json({msg:"Please login!"})
    } 
    Blog.destroy({
      where: {
        id: req.params.id
      }
    })  
    .then(deletedBlog => {
      res.json(deletedBlog);
    })    
    .catch(err => {
      console.log(err);
      res.status(500).json({msg: "an error occurred", err});
    });  
  });

module.exports = router;
