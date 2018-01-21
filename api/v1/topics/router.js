import express from 'express';
import controller from './controller';

const router = express.Router();

/**
 * Effective URL is GET /topics/:topicId/questions
 */
router.get('/:topicId/questions', (req, res) => {
  try {
    req.status(200).send(controller.getQuestions());
  } catch (err) {
    console.error('Unexpected error in getting questions, ERROR::', err);
    res.status(500).send({ error: 'Unable to get questions.' });
    return;
  }
});

module.exports = router;