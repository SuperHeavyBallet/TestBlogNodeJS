// To manually create a server requires the 'http' module to be accessed

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// Here we make a variable to hold the instance of this new server, in case we want to directly acesss it at a later point
// createServer will create a new server, but not on any particular port yet, 
// 'listen' will start the server and bind it to a port
// Takes a callback function with 2 arguments,
// 1st a Request, 2nd a response



const server = http.createServer((req, res) => {

        // Here, you might typically handle the request and send a response

        // lodash
        const num = _.random(0,20);
        console.log(num);

        const greet = _.once(() => {
            console.log("Hello");
        });

        greet();
        greet();

    // Set header content type
    res.setHeader('Content-type', 'text/html'); // Setting the type of content to be said

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
           
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // Send an html file

    fs.readFile(path, (err, data) => {
        if (err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            //res.write(data);
            //res.end();
            // or

            res.end(data);
        }
    })
});

// Now we tell the server to listen for incoming requests
// .listen takes 3 arguments
// 1st the port address to host the server on
// second the dommain name of the host
// 3rd an async callback function

server.listen(3000, 'localhost', () => {
    console.log('Listening for Requests on Port 3000');
});