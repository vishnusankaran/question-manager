import express from 'express';
import topics from './topics';

const router = express.Router();

router.use('/topics', topics);

export default router;