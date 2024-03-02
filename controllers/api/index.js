const router = require('express').Router();
const userRoutes = require('./userRoutes');
const express = require('./express');

router.use('/users', userRoutes);
router.use('/posts', express);

module.exports = router;
