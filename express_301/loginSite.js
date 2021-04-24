const path = require('path');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {

    if(req.query.msg === 'fail') {
        res.locals.msg = `Sorry. This username and password combination does not exits`
    } else{
        res.locals.msg = ``
    }

    next()
});

app.get('/', (req, res, next) => {
    res.send('Sanity Check');
});

app.get('/login', (req, res, next) => {
    // The req object has a query property in Express
    // req.query is an object, with a property of every key in the query string
    // The query data is where you put insecure data
    // console.log(req.query)
    const msg = req.query.msg;
    if(msg === 'fail') {
        //run some other function...
    }
    res.render('login', {});
})

app.post('/process_login', (req, res, next) => {
    // req.body is made by urlencoded, which parses the http message for sent data!
    
    const password = req.body.password;
    const username = req.body.username;

    // Check the db to see if user credentials are valid
    // if they are valid...
        // - save their username in a cookie
        // - is send them to the welcome page

    if(password === 'x') {
        // res.cookie takes 2 args:
        // 1. name of the cookie
        // 2. value to set it to

        res.cookie('username', username);
        
        // res.redirect take 1 arg:
        // 1. Where to send the browser
        res.redirect('/welcome');
             
    }else {
        // The '?' is a special character in a URL
        res.redirect('/login?msg=fail&test=hello')
    }
    
    // res.json(req.body);
})

app.get('/welcome', (req, res, next) => {
    res.render('welcome', { 
        // username: req.body.username --> this won't work because- redirect()- browser -> make a new request
        // -> whole new req, res objects.
        // use: req.cookies object will have a property for every named cookie
        // that has been set
        username: req.cookies.username
    });
})

// app.param() - takes 2 args:
// 1. param to look for in the route 
// 2. the callback to run (with the usuals)
app.param('id', (req, res, next, id) => {
    console.log('Params called: ', id);
    // if id has something to do with stories...
    // if id has something to do with blog...

    next();
})

// in a route, anytime something has a : in front it is a wildcard!
// wildcard, will match anythibng in that slot
app.get('/story/:id', (req, res, next) => {
    // the req.params object always exists
    // It will have a property for each wildcard in the route
    res.send(`<h1> Story ${req.params.id} </h1>`)
    // res.send('<h1> Story 1 </h1');
})

// THIS WILL NEVER RUN, because it matches above
// app.get('/story/:blogId', (req, res, next) => {
//     // the req.params object always exists
//     // It will have a property for each wildcard in the route
//     res.send(`<h1> Story ${req.params.storyId} </h1>`)
//     // res.send('<h1> Story 1 </h1');
// })

app.get('/story/:storyId/:link', (req, res, next) => {
    // the req.params object always exists
    // It will have a property for each wildcard in the route
    res.send(`<h1> Story ${req.params.storyId} - ${req.params.link} </h1>`)
    // res.send('<h1> Story 1 </h1');
})



// app.get('/story/1', (req, res, next) => {
//     res.send('<h1> Story 1 </h1');
// })

app.get('/statement', (req, res, next) => {

    // This will render the statement image IN the browser
    // res.sendFile(path.join(__dirname, 'userStatements/BankStatementChequing.png'));
    // app has a download method! Takes 2 args:
    // 1. filename 
    // 2. optionally, What you want the filename to download as
    // 3. callback which comes with the error.
    res.download(path.join(__dirname, 'userStatements/BankStatementChequing.png'), 'JimStatement.png', (error) => {
        // if there is an error in sending the File, headers will already be sent
        if(error) {
            // res.headersSent is a bool, true if headers are already sent
            if(!res.headersSent) {
                res.redirect('/download/error');
            }
        }
    });
    // --> This then calls res.sendFile()
    // --> this going to set header for you - content-disposition-> attachment


    // attachment ONLY sets the headers for content-disposition to attachment
    // IF, you provide a file, it will also set the filename
    // res.attachment(path.join(__dirname, 'userStatements/BankStatementChequing.png'), 'JimStatement.png')

    // res.set('Content-Disposition', 'attachment');
    // res.sendFile()
})

app.get('/logout', (req, res, next) => {

    // res.clearCookie takes 1 arg:
    // 1. Cookie to clear (by name)
    res.clearCookie('username');
    res.redirect('/login');

})


app.listen(3000);