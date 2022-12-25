const express = require('express');
const userController = require('../controllers/userControllers');
const routes = express.Router();
const {loginAndSignupPage} = require('../middleware/authMiddleware');


routes.get('/login', loginAndSignupPage, userController.login_get);

routes.get('/signup', loginAndSignupPage, userController.signup_get);

routes.post('/login', userController.login_post);

routes.post('/signup', userController.signup_post);

routes.get('/logout', userController.logout_get);

module.exports = routes;