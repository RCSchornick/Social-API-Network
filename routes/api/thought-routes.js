const router = require('express').Router();

const {
  addThought,
  deleteThought,
  editThought,
  getThought,
  getThoughtById,
  addReaction,
  deleteReaction,

} = require('../../controllers/thought-controller');

router.route('/')
    .get(getThought)
    .post(addThought)

// /api/comments/<userId>
router.route('/:thoughtId')
    .put(editThought)
    .get(getThoughtById)
    .delete(deleteThought)

// /api/comments/<userId>/<commentId>
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// /api/comments/<userId>/<commentId>/<replyId>
router.route('/:thoughtId/reactions/:reactionsId')
    .delete(deleteReaction);

module.exports = router;
