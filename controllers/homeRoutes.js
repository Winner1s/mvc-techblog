const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({ include: [User] });
    const hbsBlogs = blogs.map(blog => blog.get({ plain: true }));
    const loggedIn = req.session.user ? true : false;
    res.render('homepage', { blogs: hbsBlogs, loggedIn, username: req.session.user?.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred", error });
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const userData = await User.findByPk(req.session.user.id, { include: [Blog, Comment] });
    const hbsData = userData.get({ plain: true });
    hbsData.loggedIn = req.session.user ? true : false;
    res.render('dashboard', hbsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred", error });
  }
});

// Blog details route
router.get('/blogs/:id', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const blogData = await Blog.findByPk(req.params.id, { include: [User, { model: Comment, include: [User] }] });
    const dbBlog = blogData.get({ plain: true });
    const loggedIn = req.session.user ? true : false;
    if (dbBlog.userId != req.session.user.id) {
      return res.render('comment', { hbsBlog: dbBlog, loggedIn, username: req.session.user.username });
    } else {
      res.render('updateDelete', { hbsBlog: dbBlog, loggedIn, username: req.session.user.username });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred", error });
  }
});

// Default route
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;