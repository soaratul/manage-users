const express = require('express');
const { list, updateOne, getMe } = require('../../controllers/user/controller');
const { updateProfileSchema } = require('../../controllers/user/validation');
const { yupValidate } = require('../../middlewares');
const { auth } = require('../../middlewares');

const routers = express.Router();

routers.get('/', auth, list);

routers.get('/me', auth, getMe);

routers.put('/:id', auth, yupValidate(updateProfileSchema), updateOne);

module.exports = routers;
