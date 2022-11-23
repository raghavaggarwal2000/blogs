const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


const app = express();

const dbURL = "mongodb+srv://clg-project:test1234@clg-project.xksl3.mongodb.net/blog?retryWrites=true&w=majority";

// used to connect to database, and objects are written to remove depreciation warnings
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
    console.log("connected to db");
    // localhost link is: localhost:3000/
    app.listen(3000);
})
.catch((err)=> console.log("Error at connecting to DB" + err));



// this is used to register for view engine
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
// this will take the form data(if submitted by the user) and with be connected to req object
app.use(express.urlencoded({extended: true}))



app.get('/', (req, res) => {
    res.render('home', {title: 'Home Page'});
});

app.post('/upload_blog', (req,res) =>{
    // const blog = new Blog({
    //     userName : 'Raghav Aggarwal',
    //     blogName: 'New blog',
    //     body : 'New Body'
    // });
    // blog.save()
    // .then(result => res.send(result))
    // .catch(err => console.log("upload err" + err));
    console.log(req.body);
    res.send(req.body);
});

app.get('/get_blog', (req, res)=>{
    Blog.find()
    .then(result=>{
        // res.send(result);
        res.render('get_blog', {title: 'Upload Blogs', blogs: result});
    })
    .catch(err=> console.log("get_blog err" + err));
});

app.get('/blog/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('body', {blog: result, title: 'Blog Body'});
    })
    .catch(err => console.log("/blog/:id err" + err));
});