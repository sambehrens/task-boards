const modelName = 'Collaborator';
const router = require('express').Router();

const ApiHelper = require('./utils/apiHelper');

// @route POST api/collaborators/
ApiHelper.create(router, modelName);

// @route POST api/collaborators/filter
ApiHelper.filter(router, modelName);

// @route GET api/collaborators/:id
ApiHelper.get(router, modelName);

// @route PATCH api/collaborators/:id
ApiHelper.edit(router, modelName);

// @router DELETE api/collaborators/:id
ApiHelper.delete(router, modelName);

module.exports = router;
