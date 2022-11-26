const express = require('express');
const blogController = require('../controllers/blogControllers');

const routes = express.Router();


routes.get('/', blogController.blogIndex);

routes.get('/upload_blog', blogController.blog_create_get);

routes.post('/upload_blog', blogController.blog_create_post);

routes.get('/blog/:id', blogController.blog_body);

routes.delete('/blog/:id', blogController.delete_blog);


module.exports = routes;