const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');

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
app.use(express.urlencoded({extended: true}));

// this will take any json data which will come along with req and it passes it to javascript object and attaches it to 
// req object so that we can use it. Ex: using json we can use it
app.use(express.json());
  
//middleware(create cookies)
app.use(cookieParser());

app.get('*', checkUser);
app.use(userRoutes);
app.use(blogRoutes);

app.use((req,res)=>{
    res.status(404).render('404', {title: 'Wrong Page'});
});
