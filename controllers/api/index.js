const router = express.Router();
const express = require('express');

const userRoutes = require('./api/userRoutes.js');
router.use('/users', userRoutes);

const blogRoutes = require('./api/blogRoutes.js');
router.use('/blogs', blogRoutes);

const commentRoutes = require('./api/commentRoutes.js');
router.use('/comments', commentRoutes);

const homeRoutes = require('./homeRoutes.js');
router.use('/', homeRoutes);

router.get('/showsessions', (req, res) => {
    res.json(req.session);
});

module.exports = router;
