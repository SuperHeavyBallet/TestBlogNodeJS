
const express = require('express');
const morgan = require('morgan');

// express app

const app = express();

// register view engine
app.set('view engine', 'ejs');

// ejs defaults to 'views' folder, if needed to specify other, use >
//app.set('views', 'views');

// listen for requests
app.listen(3000);


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

// Middleware made using Morgan, a 3rd party plugin
app.use(morgan('dev'));


/// Using Express / EJS

app.get('/', (req, res) => {

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat Bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    res.render('index', { title: 'Home',  blogs: blogs });
});


app.get('/about', (req, res) =>
{
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog Post' });
});

app.use((req, res) => {
    res.render('404', { title: '404, Not Found' });
})