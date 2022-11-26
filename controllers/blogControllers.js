const { model } = require('mongoose');
const Blog = require('../models/blog');

const blogIndex = (req, res) => {
    Blog.find()
    .then(result=>{
        res.render('blog/index', {title: 'Upload Blogs', blogs: result});
    })
    .catch(err=> console.log("Home" + err));
};

const blog_create_get = (req, res)=>{
    res.render('blog/upload_blog', {title: 'Upload Blog'});
};

const blog_create_post = (req,res) =>{
    console.log(req.body);
    const blog = new Blog({
        userName: req.body.username,
        blogName : req.body.blogname,
        body : req.body.body
    });
    blog.save()
    .then(result => res.redirect('/'))
    .catch(err => console.log("upload err" + err));
};

const blog_body = (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('blog/blog_details', {blog: result, title: 'Blog Body'});
    })
    .catch(err => console.log("/blog/:id err" + err));
};

const delete_blog = (req,res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/' });
    })
    .catch(err=> console.log("delete err " + err));
};


module.exports = {
    blogIndex,
    blog_create_get,
    blog_create_post,
    blog_body,
    delete_blog
};