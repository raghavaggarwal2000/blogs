const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


const app = express();
const port = process.env.PORT || 3000;

const dbURL = "mongodb+srv://clg-project:test1234@clg-project.xksl3.mongodb.net/blog?retryWrites=true&w=majority";

// used to connect to database, and objects are written to remove depreciation warnings
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
    console.log("connected to db");
    // localhost link is: localhost:3000/
    app.listen(port);
})
.catch((err)=> console.log("Error at connecting to DB" + err));



// this is used to register for view engine
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
// this will take the form data(if submitted by the user) and with be connected to req object
app.use(express.urlencoded({extended: true}))



app.get('/', (req, res) => {
    Blog.find()
    .then(result=>{
        res.render('index', {title: 'Upload Blogs', blogs: result});
    })
    .catch(err=> console.log("Home" + err));
});

app.post('/upload_blog', (req,res) =>{
    console.log(req.body);
    const blog = new Blog({
        userName: req.body.username,
        blogName : req.body.blogname,
        body : req.body.blog
    });
    blog.save()
    .then(result => res.redirect('/index'))
    .catch(err => console.log("upload err" + err));
});

app.get('/upload_blog', (req, res)=>{
    res.render('upload_blog', {title: 'Upload Blog'});
    
});

app.get('/blog/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('body', {blog: result, title: 'Blog Body'});
    })
    .catch(err => console.log("/blog/:id err" + err));
});