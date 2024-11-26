const express = require('express');
const {login, register} = require('../controllers/User');

const userRouter = express.Router();

userRouter.post('/register', register);

userRouter.post('/login', login);

module.exports = userRouter;