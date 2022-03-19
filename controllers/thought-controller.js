const { User, Thought } = require('../models');

const thoughtController = {
    addThought({ params, body}, res) {
        console.log(params);
        Thought.create(body)
        .then(({_id}) => {
            console.log(dbUserData);
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
    },
    editThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },
    getThought(req, res) {
        Thought.findOne({})
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.userId })
          .populate("thoughts")
          .populate("friends")
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
      addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.userId }, {$push:{reaction:params.reactionId}}, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },
    deleteReaction({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, {$pull:{friends:params.friendId}}, { new: true, runValidators: true })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
};
module.export = thoughtController;