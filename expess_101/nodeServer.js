// http is native to Nodejs we jst have to ask for it
const http = require('http');

// fs = file system module! fs is built-in Node.
// fs gives node access to this computer file system.
const fs = require('fs');

// the http module has a createServer method
// take 1 arg:
// 1. callback, callback has 2 arguments: req, res
const server = http.createServer((req, res) => {
    console.log(' A request was made to: ', req.url);
    if(req.url === '/') {
        // the user wants the home page! we know, because the req object has / in the url 

        // console.log(req);
        // res = our way of responding to the requester
        // http message
        // 1. start-line - CHECK
        // 2. header
        // // 3. body
        // writeHead takes 2 args:
        // 1. status code.
        // 2. object for the mime-type
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.write('');
        const homePageHTML = fs.readFileSync('node.html'); // file contents is buffer format. 
        res.write(homePageHTML);
        res.end(); // tell the browser know - the connection is closed.
    } else if(req.url === '/node.png') {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        const image = fs.readFileSync('node.png');
        res.write(image);
        res.end();
    } else if(req.url === '/style.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        const css = fs.readFileSync('style.css');
        res.write(css);
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h4> Sorry, This in not the page you are looking for! </h4>')
        res.end();
    }

     
});

// createServer returns an ohject with a listen methods
// listen takes 1 arg:
// // 1. port to listen for  http traffic on
server.listen(3000);