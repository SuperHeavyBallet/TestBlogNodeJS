// Written to process and understand this mess

This project was built alongside a YouTube course, explaining how to use Node.js, Express and MongoDB to build a simple Blog Webpage connected to a NoSql Database hosted at MongoDB and using Express to route pages and content.

Node.js is a JavaScript Runtime Environment which allows JavaScript to be executed directly on a computer or server, outside of a web browser, which was the initial primary use case.

Express is a web application framework for Node.js that simplifies server-side routing and handling by providing a set of robust features and functions to create web appplications and API's more easily and efficiently.

MongoDB is a NoSQL database which can be integrated with Node.js to store and manage data, which can then be served to users through web applications or APIs created with Node.js.

**Old Files**

*Server.js*
This is a manual way to create a server and handle routes, without using Express.

**Set Required Variables/modules**
const http = require(`http`);
This initialised the `http` variable by requiring the built-in `http` module in Node.js. This module provides functionality to create and manage an HTTP server, enabling the handling of requests and responses between the server and clients.

const fs = require(`fs`);
This initializes the `fs` variable by requiring the built-in `fs` (File System) module in Node.js. The `fs` module provides the server with the ability to interact with the file system, allowing it to access, read, write, update, create and delete files and directories.

const _ = require(`lodash`);
This initializes the `_` variable by requiring the `lodash` library. Lodash is a popular utility library in JavaScript that provides a wide range of functiions for tasks such as array manipulation, object handling, deep cloning and more. By assigning it to `_` you can conveniently use these utility functions throughout your Node.js application.

**Create the Server**
const server = http.createServer((req, res) => {

});
This initializes a `server` variable by using the `.createServer` method provided by the `http` module. The `createServer` method takes a callback function as an argument, which itself receives two parameters: `req`(short for *request*) and `res`(short for *response*). This callback function defines how the server should handle incoming HTTP requests and send back responses.

**>----->**
**Inside the Server**
const num = _.random(0,20);
console.log(num);

This simple function initializes a variable `num` using the `Lodash` library's `.random` method, which takes two parameters, the first being the minimum of the range(0) and the second being the maximum(20).

Being inside the server, this will trigger and log to the console a random number between 0 and 20(inclusive) everytime the server is activated or handles a request.

const greet = _.once(() => {
    console.log("Hello");
});
greet();
greet();

This function initializes a variable `greet` using the `Lodash` library's `.once()` method. The `.once()` method ensures that the provided function can only be executed once. Even though `greet()` is called twice, the function inside `.once()` will only run during the first call, logging `Hello` to the console just one time. On subsequent calls, the function does nothing.

**Set Header Content Type**
res.setHeader('content-type', 'text/html');

This code sets the `Content-Type` header of the HTTP response using the `setHeader` method of the `res` (response) object. The `Content-Type` header tells the browser what type of content is being sent, so it knows how to interpret and render the data correctly. In this case the content type is set to `text/html`, indicating that the response body will contain `HTML` code.

**Set Paths to Resources**
let path = './views/';

This initializes a variable named `path` with the relative file path to the `views` folder, which is typically used to store HTML files or templates that will be sent as responses to client requests.

switch(req.url) {

};

This creates a switch statement that checks the `url`(Uniform Resource Locator) of the incoming request (`req.url`). Based on the value of the `url`, the `switch` statement will determine which block of code should execute, typically to decide which HTML file or response should be returned to the client.

**>-->**

case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;

This case is triggered when the `req.url` is `'/'`, which typically represents the root or home page of the website. In this case, the `path` variable is updated to `./views/index.html`, which points to the HTML file that serves as the home page of the site.

The `statusCode` of the response is set to `200`, indicating that the request was successful and the server is responding with the requested content without any errors. The `break` statement then exits the `switch` statement, preventing any further cases from being checked.

case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;

This second case is triggered when the `req.url` is `'/about'`, which should represent the `about` page of the website. In this case, the `path` variable is updated to `,.views.about.html`, which points to the HTML file that serves as the about page of the site.

The `statusCode` is again set to `200`, indicating that all has been succesful with no errors, and again the `break` statement exits the `switch` statement, preventing further cased being checked.

case '/about-me':
           
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;

This third case provides an example of re-routing to another path. In this example, `/about-me` would have been a previous url used for the `about` page, but has been updated since, however some existing links may still exist which point to a now defunt path.

Here, the `statusCode` is set to `301`, indicating a permanent redirect. Ths means that the resource requested at `about-me` has been permanently moved to a new URL and the client(usually the browser) should update its bookmarks and use the new URL `/about` in the future.

The `Location` header is then set to the new path `/about`, telling the browser where to redirect the user.

Finally, the `res.end()` method is called to end the response, and the `break` statement again exits the switch case.

default:
            path += '404.html';
            res.statusCode = 404;
            break;

In this final, default case, if none of the `req.url` paths match any of the predefined cases, the `path` variable is updated to point to `./views/404.html`m which is the HTML file that serves as a custom error page, indicating that the requested page does not exist.

The `statusCode` is set to `404`, which is the HTTP status code for `Not Found`. This status code informs the client(typically the browser) that the server was unable to locate the requested resource.

Finally, the `break` statement exits the `switch` statement, ensuring that no further code within the `switch` is executed.

**Send an HTML file**

fs.readFile(path, (err, data) => {
    if (err) {
        console.log(err);
        res.end();
    } else {
        //res.write(data);
        //res.end();

        res.end(data);
    }
});

This utilised the `fs`(`File System`) module of Node.js to access the Files and Directories alongside the Server.

Here, the `readFile()` method of `fs` is used to `read` the file at a certain location. `readFile()` accepts two Arguments, with the first being the `url` of the file to be accessed, which was set in the previous step, depending on the request.

The second argument is a callback function which accepts two parameters, `err(error)` and `data` which holds the data found at the `path`.

Then, the callback function acts on those two variables, checking if an `error` has been returned, if so, logging the `error` to the console and ending the response there.

If no error was encountered, then the response will `write()` the `data` at the `path` location, which will return it with the response (In this case being some type of HTML file to create a webpage on going to a URL), and then `res.end()` ends the response.

These two have been commented out however, as an alternative, briefer variation exists by simply using `res.end` and passing the `data` variable directly in that method.

**Listen for incoming requests**

server.listen(3000, 'localhost', () => {
    console.log('Listening for Requests on Port 3000');
});

This uses the `.listen` method on the `server` variable to start the server and instruct it to listen for incoming requests.

The method takes three arguments.
1. Port(`3000`): This specifies the port number on which the server will listen for incoming connections, in this case set to `3000`.
2. Hostname(`localHost`): This specified the domain name or IP address where the server will be accessible. `localhost` refers to the local machine, meaning this server will only be accessible locally(i.e., from the same machine it's running on).
3. Callback function: This is an optional function that will be executed once the server starts listening. In this case the callback function logs the message `Listening for Requests on Port 3000` to the console, indicating that the server has succesfully started and is ready to handle requests.

**_END server.js_**