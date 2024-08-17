
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const blogRoutes = require('./routes/blogRoutes.js');

// Connect to mongoDB

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.62chw.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(dbURI, {
  }).then((result) => {
    console.log('Connected to MongoDB');
    app.listen(3000);
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
// express app

const app = express();

// register view engine
app.set('view engine', 'ejs');

// ejs defaults to 'views' folder, if needed to specify other, use >
//app.set('views', 'views');

// listen for requests



// // Response, send files to specific address GET requests
// app.get('/', (req, res) => {
//    res.sendFile('./views/index.html', { root: __dirname});
// });

// app.get('/about', (req, res) =>
// {

//     res.sendFile('./views/about.html', { root: __dirname});
// });

// // redirects
// app.get('/about-us', (req, res) => { 
//     res.redirect('/about');
// });

// // 404 page

// // End case in case no prior matches are met before this point, must be at the end of the script
// app.use((req, res) => {

//     // Other response methods implicitly interpret the status code, this will not, so manual informing of the status code needed
//     res.status(404).sendFile('./views/404.html', { root: __dirname});
// })

// // Manual self built middleware to fire between Requesting and Response
// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();

// });

// app.use((req, res, next) => {
//     console.log('In next middleware');
//     next();

// });

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// Middleware made using Morgan, a 3rd party plugin
app.use(morgan('dev'));


// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog 2',
//         snippet: 'About my new blog 2',
//         body: 'More about my new blog 2'
//     });

//     blog.save()
//     .then((result) => {
//         res.send((result));
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById("66be9c878f8285372a196cdc")
//     .then((result) =>
//     {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

/// Using Express / EJS

app.get('/', (req, res) => {
    res.redirect('/blogs');

});


app.get('/about', (req, res) =>
{
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs',blogRoutes);

// Else 404
app.use((req, res) => {
    res.render('404', { title: '404, Not Found' });
})