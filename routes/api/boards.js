const router = require('express').Router();
const modelName = 'Board';
const ApiHelper = require('./utils/apiHelper');
const mongoose = require('mongoose');

// @route POST api/boards/
router.post('/', (req, res) => {
    new mongoose.model(modelName)(req.body)
        .save()
        .then(doc => {
            new mongoose.model('Column')({ name: 'To do', boardId: doc._id, startColumn: true })
                .save()
                .then(_toDo => {
                    new mongoose.model('Column')({ name: 'In progress', boardId: doc._id })
                        .save()
                        .then(_inProgress => {
                            new mongoose.model('Column')({ name: 'Complete', boardId: doc._id })
                                .save()
                                .then(_complete => {
                                    return res.json(doc);
                                })
                                .catch(err => {
                                    res.status(400).json(err);
                                });
                        })
                        .catch(err => {
                            res.status(400).json(err);
                        });
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// @route POST api/boards/filter
ApiHelper.filter(router, modelName);

// @route GET api/boards/:id
ApiHelper.get(router, modelName);

// @route PATCH api/boards/:id
ApiHelper.edit(router, modelName);

// @route DELETE api/boards/:id
router.delete('/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    mongoose.model(modelName).findByIdAndDelete(id, (err, doc) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!doc) {
            return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
        }

        // Delete all the collaborators that are in that board
        mongoose.model('Collaborator').deleteMany({ boardId: id }, err => {
            if (err) {
                return res.status(404).json(err);
            }
        });

        // Delete all the columns that are in that board
        mongoose.model('Column').deleteMany({ boardId: id }, err => {
            if (err) {
                return res.status(404).json(err);
            }
        });

        // Delete all the tasks that are in that board
        mongoose.model('Task').deleteMany({ boardId: id }, err => {
            if (err) {
                return res.status(404).json(err);
            }
        });

        return res.json(doc);
    });
});

module.exports = router;
