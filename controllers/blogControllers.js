const { model } = require('mongoose');
const Blog = require('../models/blog');

const blogIndex = (req, res) => {
    Blog.find()
    .then(result=>{
        res.render('index', {title: 'Upload Blogs', blogs: result});
    })
    .catch(err=> console.log("Home" + err));
};

const blog_create_get = (req, res)=>{
    res.render('upload_blog', {title: 'Upload Blog'});
};

const blog_create_post = (req,res) =>{
    console.log(req.body);
    const blog = new Blog({
        userName: req.body.username,
        blogName : req.body.blogname,
        body : req.body.blog
    });
    blog.save()
    .then(result => res.redirect('/index'))
    .catch(err => console.log("upload err" + err));
};

const blog_body = (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('body', {blog: result, title: 'Blog Body'});
    })
    .catch(err => console.log("/blog/:id err" + err));
};


module.exports = {
    blogIndex,
    blog_create_get,
    blog_create_post,
    blog_body
};