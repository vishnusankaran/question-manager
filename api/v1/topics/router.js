import express from 'express';
import controller from './controller';

const router = express.Router();

/**
 * Effective URL is GET /topics/:topicId/questions
 */
router.get('/:topic/questions', (req, res) => {
  try {
    controller.getQuestions(res, req.params.topic, { limit: req.query.limit || 10, page: req.query.limit || 1 });
  } catch (err) {
    res.status(500).send({ error: 'Unable to get questions.' });
    return;
  }
});

export default router;