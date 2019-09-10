const router = require('express').Router();
const modelName = 'Column';
const ApiHelper = require('./utils/apiHelper');
const mongoose = require('mongoose');
const _ = require('lodash');

// @route POST api/columns/filter
ApiHelper.filter(router, modelName);

// @route GET api/columns/:id
ApiHelper.get(router, modelName);

// @route PATCH api/columns/:id
ApiHelper.edit(router, modelName);

// @route POST api/columns/move-tasks
router.post('/move-tasks', (req, res) => {
    mongoose.model('Column').findById(req.body.source.columnId, (err, sourceColumn) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!sourceColumn) {
            return res.status(404).json({ _id: `Source column '${req.body.source.columnId}' does not exist` });
        }
        let failed = false;
        req.body.taskIds.forEach(taskId => {
            if (!sourceColumn.taskIds.includes(taskId)) {
                failed = true;
            }
        });
        if (failed) {
            return res.status(400).json({ message: `Task is not in source column. Refresh and try again` });
        }

        sourceColumn.taskIds = req.body.source.taskIds;
        sourceColumn
            .save()
            .then(sourceColumn => {
                mongoose.model('Column').findById(req.body.destination.columnId, (err, destinationColumn) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    if (!destinationColumn) {
                        return res
                            .status(404)
                            .json({ _id: `Destination column '${req.body.destination.columnId}' does not exist` });
                    }
                    destinationColumn.taskIds = req.body.destination.taskIds;
                    destinationColumn
                        .save()
                        .then(destinationColumn => {
                            return res.json({ sourceColumn, destinationColumn });
                        })
                        .catch(err => res.status(400).json(err));
                });
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    });
});

module.exports = router;
