const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes.js');
router.use('/users', userRoutes);

const blogRoutes = require('./blogRoutes.js');
router.use('/blogs', blogRoutes);

const commentRoutes = require('./commentRoutes.js');
router.use('/comments', commentRoutes);

router.get('/showsessions', (req, res) => {
    res.json(req.session);
});

module.exports = router;
