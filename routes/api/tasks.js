const ApiHelper = require('./utils/apiHelper');
const router = require('express').Router();
const modelName = 'Task';
const mongoose = require('mongoose');

// @route POST api/tasks/
router.post('/', (req, res) => {
    new mongoose.model(modelName)(req.body)
        .save()
        .then(doc => {
            if (!req.body.columnId) {
                return res.status(400).json({ message: 'Column id must be provided' });
            }
            mongoose.model('Column').findById(req.body.columnId, (err, column) => {
                if (err) {
                    return res.status(400).json(err);
                }
                if (!column) {
                    return res.status(404).json({ _id: `Column '${req.body.columnId}' does not exist` });
                }
                column.taskIds.push(doc._id);
                column
                    .save()
                    .then(column => res.json({ task: doc, column }))
                    .catch(err => {
                        return res.status(400).json(err);
                    });
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// @route POST api/tasks/filter
ApiHelper.filter(router, modelName);

// @route GET api/tasks/:id
ApiHelper.get(router, modelName);

// @route PATCH api/tasks/:id
ApiHelper.edit(router, modelName);

// @router DELETE api/tasks/:id
router.delete('/:id', (req, res) => {
    mongoose.model(modelName).findByIdAndDelete(req.params.id, (err, task) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!task) {
            return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
        }

        mongoose.model('Column').findOne({ taskIds: task._id }, (err, column) => {
            if (err) {
                return res.status(400).json(err);
            }
            if (!column) {
                return res.status(404).json({ _id: `Could not find column that task is in` });
            }

            column.taskIds = column.taskIds.filter(id => id === task._id);
            column
                .save()
                .then(column => {
                    return res.json({ column, task });
                })
                .catch(err => {
                    return res.status(400).json(err);
                });
        });
    });
});

// TODO: Consider how to get rid of task references in columns taskIds list

module.exports = router;
