import express from 'express';

const router = express.Router();

router.use('/topics', require('./topics'));

module.exports = router;