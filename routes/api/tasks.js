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
                column.save().catch(err => {
                    return res.status(400).json(err);
                });
            });
            return res.json(doc);
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
ApiHelper.delete(router, modelName);

// TODO: Consider how to get rid of task references in columns taskIds list

module.exports = router;
